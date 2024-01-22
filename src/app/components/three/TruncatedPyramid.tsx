import { ThreeElements, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three";
import gridVertex from '@/app/shaders/grid/vertex.glsl';
import gridFragment from '@/app/shaders/grid/fragment.glsl';
import { Edges, GradientTexture, MeshTransmissionMaterial } from "@react-three/drei";

const BottomPyramid = (props: ThreeElements['mesh']) =>{
  const ref = useRef<THREE.Mesh>(null!)
  const geometry = useRef<THREE.CylinderGeometry>(null!)
  const [hovered, hover] = useState(false)

  return (
    <mesh
      {...props}
      ref={ref} 
      castShadow
      receiveShadow
    //   scale={clicked ? 1.5 : 1}
    //   onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <cylinderGeometry ref={geometry}  args={[.5,2 ,2,4]} />
      {/* <meshLambertMaterial emissive={0xffffff} emissiveIntensity={.3} color={0x6366f1} /> */}
     <meshNormalMaterial vertexColors/>

    </mesh>
  )
}
export default BottomPyramid;