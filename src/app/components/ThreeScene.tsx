"use client"
import { Canvas, ThreeElements, Vector3, useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import BottomPyramid from './three/TruncatedPyramid';
import { Args, CameraControls, CameraShake, Caustics, Edges, GradientTexture, MeshTransmissionMaterial, OrbitControls, OrthographicCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

function Box({position,rotation,color=0xFFBB34,cubeArgs=[.5,.5,.5]}) {
  const { viewport } = useThree();
  const ref = useRef<THREE.Mesh>(null!)
  const material = useRef<THREE.Material>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const cubeSizeSeed = Math.random()+0.5;
  const seed = Math.random()+0.5;
  // const [seed,setSeed] = useState(Math.random()*1.4)
  useFrame(({clock,pointer}) => {
    // const x = (pointer.x * viewport.width) / 2.5
    // const y = (pointer.y * viewport.height) / 2.5
    // ref.current.lookAt(Math.sin(x)+.3*x, y, 1)
    ref.current.rotation.y = Math.cos(clock.getElapsedTime()*seed) ;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime()*seed) ;
    ref.current.position.y = (Math.sin(clock.getElapsedTime()*seed) /2) +1;
    
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

const Thorus = ({position,scale=([1,1,1] as Vector3)}) =>{
  const ref = useRef<THREE.Mesh>(null!)
  const {pointer,viewport,camera} = useThree();
  useFrame((state,delta)=>{
    ref.current.rotation.x +=delta
    ref.current.rotation.z +=delta
        const x = (pointer.x * viewport.width) / 2.5
    const y = (pointer.y * viewport.height) / 2.5
    // ref.current.lookAt(x/2, y/2,ref.current.rotation.z+delta)
  })
  return(
    <mesh
    ref={ref}
    scale={scale}
    castShadow
    receiveShadow
    position={position}>
    <torusKnotGeometry  args={[1,.4,1032,64,1,1]}/>
    {/* <MeshTransmissionMaterial resolution={1024} distortion={0}  color={0x6366f1} thickness={1} anisotropy={10} distortionScale={1} temporalDistortion={10} /> */}

    <meshNormalMaterial />
  </mesh>
  );
}

const BasePlatform = ({color=0xffffff}) =>{
  return(
    <mesh receiveShadow rotation={[0,Math.PI/4,0]} position={[0,-1,0]}>
        <boxGeometry args={[7,.3,7]} />
        <meshLambertMaterial color={color}/>
      </mesh>
  );
}

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return (
    <Canvas  shadows className='absolute' orthographic camera={{ zoom: (windowSize[0]-70)/15, position: [0, 45, 100] }} >
    <ambientLight color={0xFADECE} intensity={1} />
    {/* <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} /> */}
    <pointLight  position={[30, 20, 15]} color={0xddddfe} castShadow receiveShadow decay={0} intensity={5} ></pointLight>
    <directionalLight color={0x0000ff} intensity={5} />
    <hemisphereLight args={[0xffffbb, 0x080820, 1]} />
    <MainCone/>
    <BottomPyramid position={[0,0,0]}/>
    <Box color={0x6366f1} cubeArgs={[.6,.6,.6]}  position={[3,3,0]} rotation={[0,Math.PI/4,0]} />
    <Box color={0xFF2259} cubeArgs={[1,1,1]} position={[-3.5,3,-1]} rotation={[0,Math.PI/4,0]}/>
    {/* <Box color={0x06A77D} position={[-2.5,4,2]} rotation={[0,Math.PI/4,0]}/> */}
    <Box position={[0,2,2.5]} rotation={[0,Math.PI/4,0]}/>
    <gridHelper material={new THREE.LineBasicMaterial({color:0x334155})} args={[50,50]} rotation={[0,Math.PI/4,0]} position={[0,-1.15,2.1]}/>
      <BasePlatform color={0x99f6e4}/>
      <OrbitControls enableZoom={false}  enablePan={false} autoRotate autoRotateSpeed={.4} />
      {/* <CameraControls dollyToCursor makeDefault /> */}

      {/* <mesh position={[0,2,0]}>
        <planeGeometry args={[1,1,10,10]}/>
        <meshNormalMaterial wireframe/>
      </mesh> */}
      <Thorus scale={[.7,.7,1]} position={[.5,2,-3]}/>
    </Canvas>
  )
};

export default ThreeScene;