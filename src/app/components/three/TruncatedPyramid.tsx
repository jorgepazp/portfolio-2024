import { ThreeElements, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three";
import gridVertex from '@/app/shaders/grid/vertex.glsl';
import gridFragment from '@/app/shaders/grid/fragment.glsl';
import { Edges, GradientTexture } from "@react-three/drei";

const BottomPyramid = (props: ThreeElements['mesh']) =>{
  const ref = useRef<THREE.Mesh>(null!)
  const geometry = useRef<THREE.CylinderGeometry>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
//   useFrame((state, delta) => (ref.current.rotation.x += delta))
useEffect(()=>{
    const darkblue = new THREE.Color(0x0f172a);
    const blue = new THREE.Color(0x6366f1);
    const white = new THREE.Color(0xf8fafc);
    const gray = new THREE.Color(0xeef2ff);
    const black = new THREE.Color(0xd1d1d1);
    const pink = new THREE.Color(0xe91e63);
    const orange = new THREE.Color(0xFF9800);
    const red = new THREE.Color(0xf44336);
    const green = new THREE.Color(0xbada55);
  const nonIndexedGeometry = geometry.current.toNonIndexed();
    const positionAttribute = nonIndexedGeometry.getAttribute('position')
    console.log(positionAttribute.count)
    const mix = [red,red,orange,orange,pink,pink];
    const _colors = [];
    const newColor = new THREE.Color();
    for (let i = 0;i<positionAttribute.count;i+=3) {
      newColor.set(mix[i/3]);
      _colors.push(newColor.r);
      _colors.push(newColor.g);
      _colors.push(newColor.b);
    }
    const colors = new THREE.Float32BufferAttribute(_colors,3);
    geometry.current.setAttribute("aVertexColor",colors);
    geometry.current.computeVertexNormals
    // const nonIndexedGeometry = geometry.current.toNonIndexed();
    // const positionAttribute = nonIndexedGeometry.getAttribute('position');
    // const color = new THREE.Color();
    // const colors = [];
    // console.log(positionAttribute.count)
    // for(let i = 0; i< positionAttribute.count; i+=3){

    //     color.set(Math.random() * 0xffffff);
    //     colors.push(color.r,color.g,color.b);
    //     console.log(color)
    //     colors.push(color.r,color.g,color.b);
    //     colors.push(color.r,color.g,color.b);
    // }
    // nonIndexedGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors,3));
    // geometry.current.setAttribute('color', new THREE.Float32BufferAttribute(colors,3))
},[]);
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
      {/* <meshLambertMaterial vertexColors={true}/> */}
      {/* <meshStandardMaterial  vertexColors={true}  color={hovered ? 'hotpink' : 'orange'} /> */}
      {/* <shaderMaterial  vertexShader={gridVertex} fragmentShader={gridFragment}/> */}
      <meshStandardMaterial>
      <Edges
    scale={1.1}
    threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
    color="white"
  />
      <GradientTexture
      stops={[0,0.8, 1]} // As many stops as you want
      colors={[ "#c7d2fe",'#e0e7ff','#eef2ff']} // Colors need to match the number of stops
      size={1024} // Size is optional, default = 1024
    />
      </meshStandardMaterial>
    </mesh>
  )
}
export default BottomPyramid;