import { Args } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";

function Box({position,rotation,color=0xFFBB34,rotatingRadius = 0,cubeArgs=[.5,.5,.5]}) {
    const { viewport } = useThree();
    const ref = useRef<THREE.Mesh>(null!)
    const material = useRef<THREE.Material>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const cubeSizeSeed = Math.random()+0.5;
    const [seed,setSeed] = useState(Math.random()+0.5);
    // const [seed,setSeed] = useState(Math.random()*1.4)
    useFrame(({clock,pointer}) => {
      // const x = (pointer.x * viewport.width) / 2.5
      // const y = (pointer.y * viewport.height) / 2.5
      // ref.current.lookAt(Math.sin(x)+.3*x, y, 1)
      ref.current.rotation.y = Math.cos(clock.getElapsedTime()*seed) ;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime()*seed) ;
      ref.current.position.y = (Math.sin(clock.getElapsedTime()*seed) /2) +1;
      if(rotatingRadius){
        ref.current.position.x = (Math.sin(clock.getElapsedTime()+rotatingRadius))
        ref.current.position.z = (Math.cos(clock.getElapsedTime()+rotatingRadius))
      }
      // ref.current.lookAt(new Vector3(pointer.x,pointer.y))

      
    })
    return (
      <mesh
      castShadow
        position={position}
        rotation={rotation}
        ref={ref}>
        <boxGeometry args={cubeArgs as Args<any>} />
        <meshPhongMaterial color={color}  />
        {/* <meshNormalMaterial/> */}
      </mesh>
    )
  }
export default Box;  