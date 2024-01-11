"use client"
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const render=()=> {

        renderer.render( scene, camera );
      
      }
      console.log("HOOK")
        const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const geometry = new THREE.BoxGeometry(20,1,10);
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        const aspect = window.innerWidth / window.innerHeight;
        const d = 20;
        const camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
        	// controls
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render );
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2;
        camera.position.set( 20, 20, 20 ); // all components equal
        camera.lookAt( scene.position ); // or the origin
        // camera.position.set( 20, 20, 20 );
        // camera.rotation.order = 'YXZ';
        // camera.rotation.y = - Math.PI / 4;
        // camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );
        controls.update();
        const conegeometry = new THREE.ConeGeometry( 5, 7, 4 ); 
        const conematerial = new THREE.MeshNormalMaterial();
        const cone = new THREE.Mesh(conegeometry, conematerial ); scene.add( cone );
        cone.rotateY(Math.PI/4)
        cone.translateY(1)
        scene.add(cube);
              // Render the scene and camera
              renderer.setSize(window.innerWidth, window.innerHeight);
              renderer.render(scene, camera);
        containerRef.current?.appendChild(renderer.domElement);
        camera.position.z = 5;
        const renderScene = () => {
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
          };
        renderScene()

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
      
            // camera.aspect = width / height;
            camera.updateProjectionMatrix();
      
            renderer.setSize(width, height);
          };
          window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.forceContextLoss();
            renderer.dispose();
            cube.geometry.dispose();
            cube.material.dispose();

          };
      }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;