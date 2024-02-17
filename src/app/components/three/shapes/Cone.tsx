import { ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Cone = (props: ThreeElements['mesh']) =>{
  const ref = useRef<THREE.Mesh>(null!)
  const geometry = useRef<THREE.CylinderGeometry>(null!)

  return (
    <mesh
      {...props}
      ref={ref} 
      castShadow
      receiveShadow>
      <cylinderGeometry ref={geometry}  args={[.5,2 ,2,4]} />
     <meshNormalMaterial vertexColors/>

    </mesh>
  )
}
export default Cone;