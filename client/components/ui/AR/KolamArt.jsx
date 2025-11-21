import React from 'react';
import { useTexture, Float } from '@react-three/drei';

const KolamArt = () => {
  // Make sure kolam.png exists in public folder
  const texture = useTexture('/kolam.png');

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group rotation={[0, 0.2, 0]}>
        {/* Canvas (Square) */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[3, 3, 0.1]} /> 
          <meshStandardMaterial map={texture} roughness={0.9} />
        </mesh>
        {/* Frame (Dark) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 3.2, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
};
export default KolamArt;