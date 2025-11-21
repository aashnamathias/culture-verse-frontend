import React from 'react';
import { useTexture, Float } from '@react-three/drei';

const MadhubaniArt = () => {
  const texture = useTexture('/madhubani.jpg'); 

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group rotation={[0, 0.1, 0]}>
        {/* Canvas */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[3.5, 2.5, 0.1]} /> 
          <meshStandardMaterial map={texture} roughness={0.9} color="white" />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.7, 2.7, 0.08]} />
          <meshStandardMaterial color="#d4a373" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
};
export default MadhubaniArt;