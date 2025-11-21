import React, { useMemo } from 'react';

// --- MATERIALS ---
const Lacquer = ({ color }) => (
  <meshStandardMaterial color={color} roughness={0.1} metalness={0.2} envMapIntensity={1.5} />
);

const GoldPaint = () => (
  <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.8} envMapIntensity={2} />
);

// --- FACE HELPERS ---
const Eye = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh scale={[1.2, 0.8, 0.5]}> <sphereGeometry args={[0.08, 32, 32]} /> <meshStandardMaterial color="white" /> </mesh>
    <mesh position={[0, 0, 0.035]} scale={[0.5, 0.5, 0.2]}> <sphereGeometry args={[0.08, 32, 32]} /> <meshStandardMaterial color="black" /> </mesh>
    <mesh position={[0, 0.05, 0]}> <torusGeometry args={[0.09, 0.01, 16, 32, 2.5]} /> <meshStandardMaterial color="black" /> </mesh>
  </group>
);

const Moustache = ({ position }) => (
  <group position={position}>
    <mesh position={[-0.12, -0.02, 0]} rotation={[0, 0, 0.4]}> <capsuleGeometry args={[0.03, 0.25, 4, 16]} /> <meshStandardMaterial color="black" /> </mesh>
    <mesh position={[0.12, -0.02, 0]} rotation={[0, 0, -0.4]}> <capsuleGeometry args={[0.03, 0.25, 4, 16]} /> <meshStandardMaterial color="black" /> </mesh>
  </group>
);

const Eyebrow = ({ position, rotation }) => (
  <mesh position={position} rotation={rotation}> <torusGeometry args={[0.12, 0.015, 16, 32, 2]} /> <meshStandardMaterial color="black" /> </mesh>
);

const Smile = ({ position }) => (
  <mesh position={position} rotation={[0, 0, 3.14]}> <torusGeometry args={[0.15, 0.015, 16, 32, 2.2]} /> <meshStandardMaterial color="#8B0000" /> </mesh>
);

// --- CLOTHING PATTERNS ---
const PolkaDots = ({ count = 20, radiusBase = 0.5, height = 2 }) => {
  const dots = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => {
      const y = (Math.random() * height) - (height / 2) + 1.5; 
      const angle = Math.random() * Math.PI * 2; 
      const currentRadius = radiusBase + ( (3 - y) * 0.08 ); 
      const x = Math.sin(angle) * currentRadius;
      const z = Math.cos(angle) * currentRadius;
      return { pos: [x, y, z] };
    });
  }, [count, radiusBase, height]);

  return (
    <group>
      {dots.map((d, i) => (
        <mesh key={i} position={d.pos}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <GoldPaint />
        </mesh>
      ))}
    </group>
  );
};

// --- MALE DOLL ---
const MaleDoll = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 0.2, 0]}> <cylinderGeometry args={[0.7, 0.7, 0.4, 32]} /> <Lacquer color="#F2A900" /> </mesh>
    <mesh position={[0, 1.2, 0]}> <cylinderGeometry args={[0.35, 0.4, 1.8, 32]} /> <Lacquer color="#FFFFFF" /> </mesh>
    
    <group position={[0, 2.6, 0]}>
      <mesh> <cylinderGeometry args={[0.6, 0.5, 1.4, 32]} /> <Lacquer color="#1a1a1a" /> </mesh>
      <mesh position={[0, 0, 0.51]} scale={[0.05, 1.4, 0.02]}> <boxGeometry /> <GoldPaint /> </mesh>
      <mesh position={[0, 0.3, 0.52]}> <sphereGeometry args={[0.06]} /> <GoldPaint /> </mesh>
      <mesh position={[0, 0, 0.52]}> <sphereGeometry args={[0.06]} /> <GoldPaint /> </mesh>
      <mesh position={[0, -0.3, 0.52]}> <sphereGeometry args={[0.06]} /> <GoldPaint /> </mesh>
    </group>

    <mesh position={[0, 2.0, 0]} rotation={[Math.PI/2, 0, 0]}> <torusGeometry args={[0.52, 0.1, 16, 32]} /> <Lacquer color="#D9381E" /> </mesh>
    <mesh position={[0, 3.2, 0.3]} rotation={[Math.PI, 0, 0]}> <coneGeometry args={[0.3, 0.8, 32]} /> <Lacquer color="#FFFFFF" /> </mesh>

    <mesh position={[0, 3.8, 0]}> <sphereGeometry args={[0.55, 32, 32]} /> <Lacquer color="#F5D0C5" /> </mesh>
    <group position={[0, 3.8, 0.48]}>
      <Eye position={[-0.18, 0.1, 0]} /> <Eye position={[0.18, 0.1, 0]} />
      <Eyebrow position={[-0.18, 0.22, 0]} rotation={[0, 0, 0.2]} /> <Eyebrow position={[0.18, 0.22, 0]} rotation={[0, 0, -0.2]} />
      <Moustache position={[0, -0.15, 0]} /> <Smile position={[0, -0.12, 0]} />
      <mesh position={[0, 0.25, 0.05]}> <circleGeometry args={[0.03, 32]} /> <meshStandardMaterial color="red" /> </mesh>
    </group>

    <group position={[0, 4.3, 0]}>
      <mesh> <cylinderGeometry args={[0.6, 0.5, 0.3, 32]} /> <Lacquer color="#FFFFFF" /> </mesh>
      <mesh position={[0, 0.1, 0]}> <torusGeometry args={[0.6, 0.05, 16, 32]} rotation={[Math.PI/2, 0, 0]} /> <Lacquer color="#F2A900" /> </mesh>
    </group>

    <group>
      <mesh position={[-0.7, 2.8, 0]} rotation={[0, 0, 0.2]}> <cylinderGeometry args={[0.15, 0.15, 1.2]} /> <Lacquer color="#1a1a1a" /> </mesh>
      <mesh position={[-0.8, 2.25, 0]} rotation={[0, 0, 0.2]}> <torusGeometry args={[0.16, 0.03, 16, 32]} /> <GoldPaint /> </mesh>
      <mesh position={[-0.9, 2.2, 0]}> <sphereGeometry args={[0.18]} /> <Lacquer color="#F5D0C5" /> </mesh>
      <mesh position={[0.7, 2.8, 0]} rotation={[0, 0, -0.2]}> <cylinderGeometry args={[0.15, 0.15, 1.2]} /> <Lacquer color="#1a1a1a" /> </mesh>
      <mesh position={[0.8, 2.25, 0]} rotation={[0, 0, -0.2]}> <torusGeometry args={[0.16, 0.03, 16, 32]} /> <GoldPaint /> </mesh>
      <mesh position={[0.9, 2.2, 0]}> <sphereGeometry args={[0.18]} /> <Lacquer color="#F5D0C5" /> </mesh>
    </group>
  </group>
);

// --- FEMALE DOLL ---
const FemaleDoll = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 1.5, 0]}> <cylinderGeometry args={[0.5, 0.75, 3.0, 32]} /> <Lacquer color="#D9381E" /> </mesh>
    <PolkaDots radiusBase={0.55} height={2.5} count={40} />
    
    <mesh position={[0, 0.4, 0]} rotation={[Math.PI/2, 0, 0]}> <torusGeometry args={[0.73, 0.03, 16, 32]} /> <GoldPaint /> </mesh>
    <mesh position={[0, 0.2, 0]} rotation={[Math.PI/2, 0, 0]}> <torusGeometry args={[0.74, 0.03, 16, 32]} /> <GoldPaint /> </mesh>
    <mesh position={[0, 0.3, 0]} rotation={[Math.PI/2, 0, 0]}> <torusGeometry args={[0.72, 0.08, 16, 32]} /> <Lacquer color="#F2A900" /> </mesh>
    <mesh position={[0, 2.6, 0.35]} rotation={[0.5, 0, 0]}> <torusGeometry args={[0.3, 0.05, 16, 32]} /> <GoldPaint /> </mesh>
    <mesh position={[0, 2.4, 0.38]} rotation={[0.5, 0, 0]}> <torusGeometry args={[0.4, 0.03, 16, 32]} /> <Lacquer color="#FFFFFF" /> </mesh>

    <mesh position={[0, 3.5, 0]}> <sphereGeometry args={[0.55, 32, 32]} /> <Lacquer color="#F5D0C5" /> </mesh>
    <group position={[0, 3.5, 0.48]}>
      <Eye position={[-0.16, 0.05, 0]} scale={1.1} /> <Eye position={[0.16, 0.05, 0]} scale={1.1} />
      <Eyebrow position={[-0.16, 0.2, 0]} rotation={[0, 0, 0.1]} /> <Eyebrow position={[0.16, 0.2, 0]} rotation={[0, 0, -0.1]} />
      <Smile position={[0, -0.2, 0]} />
      <mesh position={[-0.05, -0.08, 0.08]}> <sphereGeometry args={[0.03]} /> <GoldPaint /> </mesh>
      <mesh position={[0, 0.25, 0.05]}> <circleGeometry args={[0.06, 32]} /> <meshStandardMaterial color="#8b0000" /> </mesh>
    </group>

    <mesh position={[0, 3.7, -0.2]}> <sphereGeometry args={[0.56, 32, 32]} /> <Lacquer color="#1a1a1a" /> </mesh>
    <mesh position={[0, 3.5, -0.5]}> <sphereGeometry args={[0.3, 32, 32]} /> <Lacquer color="#1a1a1a" /> </mesh>

    <group>
       <mesh position={[-0.6, 2.5, 0]} rotation={[0, 0, 0.3]}> <cylinderGeometry args={[0.15, 0.18, 1.2]} /> <Lacquer color="#D9381E" /> </mesh>
       <mesh position={[-0.8, 2.0, 0]} rotation={[0, 0, 0.3]}> <torusGeometry args={[0.16, 0.04, 16, 32]} /> <GoldPaint /> </mesh>
       <mesh position={[-0.85, 1.9, 0]}> <sphereGeometry args={[0.18]} /> <Lacquer color="#F5D0C5" /> </mesh>
       <mesh position={[0.6, 2.5, 0]} rotation={[0, 0, -0.3]}> <cylinderGeometry args={[0.15, 0.18, 1.2]} /> <Lacquer color="#D9381E" /> </mesh>
       <mesh position={[0.8, 2.0, 0]} rotation={[0, 0, -0.3]}> <torusGeometry args={[0.16, 0.04, 16, 32]} /> <GoldPaint /> </mesh>
       <mesh position={[0.85, 1.9, 0]}> <sphereGeometry args={[0.18]} /> <Lacquer color="#F5D0C5" /> </mesh>
    </group>
  </group>
);

// --- MAIN EXPORT ---
const ChannapatnaToy = () => {
  return (
    <group>
      {/* Positioned side-by-side */}
      <MaleDoll position={[-0.9, -2, 0]} />
      <FemaleDoll position={[0.9, -2, 0]} />
    </group>
  );
};

export default ChannapatnaToy;