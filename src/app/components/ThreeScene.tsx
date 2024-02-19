"use client"
import { MeshTransmissionMaterial, OrbitControls, Text, Text3D } from '@react-three/drei';
import { Canvas, ThreeElements, Vector3, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Box from './three/shapes/Box';
import Cone from './three/shapes/Cone';
import BasePlatform from './three/shapes/Platform';
import Thorus from './three/shapes/Thorus';


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
    {/* <meshPhongMaterial reflectivity={10} specular={0x00ff00} color={0x6366f1} /> */}
    <MeshTransmissionMaterial resolution={1024}  distortion={0.2} color={0xffffff} reflectivity={0} thickness={10} anisotropy={2} distortionScale={0} temporalDistortion={0} />
    <coneGeometry args={[.5,.7,4]}/>
  </mesh>
  )
}




const Scene01: React.FC = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
  
   

    if (typeof window !== "undefined") {
      // Client-side-only code
      const handleWindowResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener('resize', handleWindowResize); 
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      console.log("resize")
    };
    } 
 

  }, []);
  return (
    <Canvas shadows className='absolute' orthographic camera={{ zoom: (windowSize[0]-70)/15, position: [0, 45, 100] }} >
    <ambientLight color={0xFADECE} intensity={1} />
    <pointLight  position={[30, 20, 15]} color={0xddddfe} castShadow receiveShadow decay={0} intensity={5} ></pointLight>
    <directionalLight color={0x0000ff} intensity={5} />
    <hemisphereLight args={[0xffffbb, 0x080820, 1]} />
    <MainCone/>
    <Cone position={[0,0,0]}/>
    <Box color={0x6366f1} cubeArgs={[.6,.6,.6]}  position={[3,3,0]} rotation={[0,Math.PI/4,0]} />
    <Box color={0xFF2259} cubeArgs={[1,1,1]} position={[-3.5,3,-1]} rotation={[0,Math.PI/4,0]}/>
    <Box position={[0,2,2.5]} rotation={[0,Math.PI/4,0]}/>
    <Sphere position={[0,1.5,0]} />
    <gridHelper material={new THREE.LineBasicMaterial({color:0x334155})} args={[50,50]} rotation={[0,Math.PI/4,0]} position={[0,-1.15,2.1]}/>
      <BasePlatform color={0x99f6e4}/>
      <OrbitControls  enableZoom={true} enableRotate  enablePan={false} autoRotate autoRotateSpeed={.4}  />

      <Thorus scale={[.7,.7,1]} position={[.5,2,-3]}/>
      <Helix/>
      <Text3D position={[-3.5,-.7,0]} rotation={[0, -Math.PI/4,0]} font={"/azaret.json"}
              curveSegments={24}
              bevelEnabled
              bevelSize={0.08}
              bevelThickness={0.03}
              height={.5}
              size={.7}
              lineHeight={0.3}
              letterSpacing={0.3}>
        hello
        <meshNormalMaterial/>
      </Text3D>
    </Canvas>
  )
};

const Sphere = (props: ThreeElements['mesh']) =>{
  const ref = useRef<THREE.Mesh>(null!)
  return(
    <mesh castShadow receiveShadow {...props}>
      <sphereGeometry args={[.15,10,15,5]}/>
      <meshLambertMaterial dithering reflectivity={10000}  color={0xffaa00} />
    </mesh>
  );
}

const  Helix = ({count=50}) =>{
  const itemsRef = useRef([])
  useFrame(({clock})=>{
    itemsRef.current.forEach((el,i)=>{
      el.x = Math.cos(clock.getElapsedTime()*i) +clock.getElapsedTime()
    })
  });
  const createHelix = () =>{
    let dots = [];
    for (let i=0;i< count;i++){
      const [x,y,z]=[
        i,
        (Math.random()-0.5)/3 +1.5,
        i
      ];
      dots[i] = [x,y,z]
    }
    return dots
  }
  const dots = createHelix().map((pos,i)=>(
    <Dot key={i} position={pos}/>
  ))
  return (<>
  {dots}
  </>)
}

const Dot = ({position,color=0xffffff}) =>{
  const mesh = useRef(null);
  const seed = Math.random()+.5 * 2; 
  const seedY = Math.random()-0.5; 
  useFrame(({clock,camera})=>{
    mesh.current.position.z = Math.cos(clock.getElapsedTime()*seed) +seedY
    mesh.current.position.x = Math.sin(clock.getElapsedTime()*seed)
    // mesh.current.position.y = Math.cos(clock.getElapsedTime())+Math.min(1.2,seed)
  })
  return(
    <mesh castShadow receiveShadow position={position} ref={mesh}>
      <sphereGeometry args={[0.05,2, 2]} />
        {/* <meshStandardMaterial roughness={0} metalness={0.24}  color={color}/> */}
        <meshNormalMaterial/>
    </mesh>
  )
}

export default Scene01;