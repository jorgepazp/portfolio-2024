"use client"
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import BottomPyramid from './three/TruncatedPyramid';
import { CameraControls, OrbitControls, OrthographicCamera } from '@react-three/drei';

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame(({clock}) => {
    ref.current.position.y = Math.sin(clock.getElapsedTime()) /2
  })
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[.5, .5, .5]} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
      <meshNormalMaterial/>
    </mesh>
  )
}

const MainCone = (props: ThreeElements['mesh']) =>{
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [direction,setDirection] =useState(1);
  const [min,max] = [2.3,3]
  useFrame((state, delta) => {
    // console.log(state)
    ref.current.rotation.y += delta *2;
    // ref.current.position.y += Math.sin(delta)
    // if(ref.current.position.y == min  ){
    //   setDirection(1);
    // }else if(ref.current.position.y == max){
    //   setDirection(-1)
    // }
    // ref.current.position.y += 0.1 * direction;
  })
  return (
    <mesh receiveShadow={true} castShadow={true} ref={ref} position={[0,1.5,0]}>
    {/* <meshNormalMaterial/> */}
    {/* <meshPhongMaterial color={0xBADA55} shininess={200}/> */}
    <meshStandardMaterial roughness={0} transparent={true} color={0x6366f1} />
    <coneGeometry args={[.5,.7,4]}/>
  </mesh>
  )
}

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  
  return (
    <Canvas  shadows="soft" className='absolute' orthographic camera={{ zoom: 100, position: [0, 45, 100] }} >
      
    <ambientLight intensity={1} />

    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    {/* <Box position={[-1.2, 0, 0]} /> */} *
    {/* <Box position={[1.2, 0, 0]} /> */}
    <MainCone/>
    <BottomPyramid/>
    <Box position={[3,3,0]} rotation={[0,Math.PI/4,0]}/>
    <Box position={[-3.5,4,-1]} rotation={[0,Math.PI/4,0]}/>
    <gridHelper material={new THREE.LineBasicMaterial({color:'white'})} args={[50,20]} rotation={[0,Math.PI/4,0]} position={[0,-1,0]}/>
      <mesh rotation={[0,Math.PI/4,0]} position={[0,-1.2,0]}>
        <boxGeometry args={[7,.5,7]} />
        <meshNormalMaterial/>
      </mesh>
      <OrbitControls />
      <CameraControls makeDefault />
    </Canvas>
  )
};

export default ThreeScene;