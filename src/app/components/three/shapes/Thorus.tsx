import { useThree, useFrame, Vector3 } from "@react-three/fiber";
import { useRef } from "react";

const Thorus = ({position,scale=([1,1,1] as Vector3)}) =>{
    const ref = useRef<THREE.Mesh>(null!)
    const {pointer,viewport,camera} = useThree();
    useFrame((state,delta)=>{
      ref.current.rotation.x +=delta
      ref.current.rotation.z +=delta
          const x = (pointer.x * viewport.width) / 2.5
      const y = (pointer.y * viewport.height) / 2.5
    })
    return(
      <mesh
      ref={ref}
      scale={scale}
      castShadow
      receiveShadow
      position={position}>
      <torusKnotGeometry  args={[1,.4,32,64,1,1]}/>
  
      <meshNormalMaterial flatShading/>
    </mesh>
    );
  }

  export default Thorus;