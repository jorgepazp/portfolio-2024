const BasePlatform = ({color=0xffffff}) =>{
    return(
      <mesh receiveShadow rotation={[0,Math.PI/4,0]} position={[0,-1,0]}>
          <boxGeometry args={[7,.3,7]} />
          <meshLambertMaterial color={color}/>
        </mesh>
    );
  }

  export default BasePlatform;