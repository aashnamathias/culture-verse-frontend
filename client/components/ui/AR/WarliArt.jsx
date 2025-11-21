import React from 'react';
import { useTexture, Float } from '@react-three/drei';

const WarliArt = () => {
  // Make sure warli.jpg exists in public folder
  const texture = useTexture('/warli.jpg'); 

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group rotation={[0, -0.2, 0]}>
        {/* Canvas */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[3, 2.2, 0.1]} />
          <meshStandardMaterial map={texture} roughness={0.8} />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 2.4, 0.08]} />
          <meshStandardMaterial color="#5c4033" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
};
export default WarliArt;