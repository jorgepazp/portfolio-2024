import { ThreeElements, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const BottomPyramid = (props: ThreeElements['mesh']) =>{
  const ref = useRef<THREE.Mesh>(null!)
  const geometry = useRef<THREE.CylinderGeometry>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
//   useFrame((state, delta) => (ref.current.rotation.x += delta))
useEffect(()=>{
    const nonIndexedGeometry = geometry.current.toNonIndexed();
    const positionAttribute = nonIndexedGeometry.getAttribute('position');
    const color = new THREE.Color();
    const colors = [];
    console.log(positionAttribute.count)
    for(let i = 0; i< positionAttribute.count; i+=3){
        color.set(Math.random() * 0xffffff);
        colors.push(color.r,color.g,color.b);
        console.log(color)
        colors.push(color.r,color.g,color.b);
        colors.push(color.r,color.g,color.b);
    }
    nonIndexedGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors,3));
},[]);
  return (
    <mesh
      {...props}
      ref={ref}
    //   scale={clicked ? 1.5 : 1}
    //   onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <cylinderGeometry ref={geometry}  args={[.5,2 ,2,4]} />
      <meshStandardMaterial vertexColors={true}/>
      {/* <meshStandardMaterial  vertexColors={true}  color={hovered ? 'hotpink' : 'orange'} /> */}
    </mesh>
  )
}
export default BottomPyramid;