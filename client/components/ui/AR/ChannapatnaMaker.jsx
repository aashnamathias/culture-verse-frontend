import React, { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Center } from '@react-three/drei';

// --- 1. HELPER COMPONENTS ---
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

// --- 2. THE MALLEABLE DOLL ---
const MalleableDoll = ({ isPainted, isPolished }) => {
  const woodColor = "#E3C099";
  
  const getMat = (color) => {
    if (!isPainted) {
      return { color: woodColor, roughness: 0.9, metalness: 0 };
    } else {
      return { 
        color: color, 
        roughness: isPolished ? 0.1 : 0.8,
        metalness: isPolished ? 0.2 : 0.0,
        envMapIntensity: isPolished ? 1.5 : 0
      };
    }
  };

  return (
    <group>
      {/* SCALED DOWN GEOMETRY TO FIT CAMERA */}
      <group scale={0.8}>
        <mesh position={[0, 0.2, 0]}> <cylinderGeometry args={[0.7, 0.7, 0.4, 32]} /> <meshStandardMaterial {...getMat("#F2A900")} /> </mesh>
        <mesh position={[0, 1.2, 0]}> <cylinderGeometry args={[0.35, 0.4, 1.8, 32]} /> <meshStandardMaterial {...getMat("#FFFFFF")} /> </mesh>
        
        <group position={[0, 2.6, 0]}>
            <mesh> <cylinderGeometry args={[0.6, 0.5, 1.4, 32]} /> <meshStandardMaterial {...getMat("#1a1a1a")} /> </mesh>
            {isPainted && (
                <>
                <mesh position={[0, 0, 0.51]} scale={[0.05, 1.4, 0.02]}> <boxGeometry /> <meshStandardMaterial {...getMat("#FFD700")} /> </mesh>
                <mesh position={[0, 0.3, 0.52]}> <sphereGeometry args={[0.06]} /> <meshStandardMaterial {...getMat("#FFD700")} /> </mesh>
                <mesh position={[0, 0, 0.52]}> <sphereGeometry args={[0.06]} /> <meshStandardMaterial {...getMat("#FFD700")} /> </mesh>
                <mesh position={[0, -0.3, 0.52]}> <sphereGeometry args={[0.06]} /> <meshStandardMaterial {...getMat("#FFD700")} /> </mesh>
                </>
            )}
        </group>

        <mesh position={[0, 2.0, 0]} rotation={[Math.PI/2, 0, 0]}> <torusGeometry args={[0.52, 0.1, 16, 32]} /> <meshStandardMaterial {...getMat("#D9381E")} /> </mesh>
        <mesh position={[0, 3.2, 0.3]} rotation={[Math.PI, 0, 0]}> <coneGeometry args={[0.3, 0.8, 32]} /> <meshStandardMaterial {...getMat("#FFFFFF")} /> </mesh>

        <mesh position={[0, 3.8, 0]}> <sphereGeometry args={[0.55, 32, 32]} /> <meshStandardMaterial {...getMat("#F5D0C5")} /> </mesh>
        
        {isPainted && (
            <group position={[0, 3.8, 0.48]}>
                <Eye position={[-0.18, 0.1, 0]} /> <Eye position={[0.18, 0.1, 0]} />
                <Eyebrow position={[-0.18, 0.22, 0]} rotation={[0, 0, 0.2]} /> <Eyebrow position={[0.18, 0.22, 0]} rotation={[0, 0, -0.2]} />
                <Moustache position={[0, -0.15, 0]} /> <Smile position={[0, -0.12, 0]} />
                <mesh position={[0, 0.25, 0.05]}> <circleGeometry args={[0.03, 32]} /> <meshStandardMaterial color="red" /> </mesh>
            </group>
        )}

        <group position={[0, 4.3, 0]}>
            <mesh> <cylinderGeometry args={[0.6, 0.5, 0.3, 32]} /> <meshStandardMaterial {...getMat("#FFFFFF")} /> </mesh>
            <mesh position={[0, 0.1, 0]}> <torusGeometry args={[0.6, 0.05, 16, 32]} rotation={[Math.PI/2, 0, 0]} /> <meshStandardMaterial {...getMat("#F2A900")} /> </mesh>
        </group>

        <group>
            <mesh position={[-0.7, 2.8, 0]} rotation={[0, 0, 0.2]}> <cylinderGeometry args={[0.15, 0.15, 1.2]} /> <meshStandardMaterial {...getMat("#1a1a1a")} /> </mesh>
            <mesh position={[0.7, 2.8, 0]} rotation={[0, 0, -0.2]}> <cylinderGeometry args={[0.15, 0.15, 1.2]} /> <meshStandardMaterial {...getMat("#1a1a1a")} /> </mesh>
            {isPainted && (
                <>
                <mesh position={[-0.8, 2.25, 0]} rotation={[0, 0, 0.2]}> <torusGeometry args={[0.16, 0.03, 16, 32]} /> <meshStandardMaterial {...getMat("#FFD700")} /> </mesh>
                <mesh position={[0.8, 2.25, 0]} rotation={[0, 0, -0.2]}> <torusGeometry args={[0.16, 0.03, 16, 32]} /> <meshStandardMaterial {...getMat("#FFD700")} /> </mesh>
                </>
            )}
            <mesh position={[-0.9, 2.2, 0]}> <sphereGeometry args={[0.18]} /> <meshStandardMaterial {...getMat("#F5D0C5")} /> </mesh>
            <mesh position={[0.9, 2.2, 0]}> <sphereGeometry args={[0.18]} /> <meshStandardMaterial {...getMat("#F5D0C5")} /> </mesh>
        </group>
      </group>
    </group>
  );
};


// --- 3. THE CONTROLLER ---
const ChannapatnaMaker = () => {
  const [step, setStep] = useState(0);
  const groupRef = useRef();
  
  const steps = [
    { label: "1. Raw Ivory Wood", desc: "Sourced sustainably from the Wrightia Tinctoria tree." },
    { label: "2. Wood Turning", desc: "The wood is spun and shaped on a high-speed lathe." },
    { label: "3. Lacquering", desc: "Natural dyes are applied. Friction melts the lac onto the wood." },
    { label: "4. Polishing", desc: "Buffed with dried palm leaves for a glass finish." }
  ];

  useFrame((state, delta) => {
    if (groupRef.current) {
      const speed = step < 3 ? 12 : 0.8; 
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group>
      {/* 
         FIX: Use <Center> to guarantee it's in the middle of the Stage
         Removed manual Y offset which was hiding it
      */}
      <Center>
        <group ref={groupRef}>
            {step === 0 && (
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 4, 32]} />
                <meshStandardMaterial color="#E3C099" roughness={0.9} />
            </mesh>
            )}
            {step === 1 && <MalleableDoll isPainted={false} isPolished={false} />}
            {step === 2 && <MalleableDoll isPainted={true} isPolished={false} />}
            {step === 3 && <MalleableDoll isPainted={true} isPolished={true} />}
        </group>
      </Center>

      {/* 
         FIX: Moved Html closer (y={-2} instead of -2.5) 
         Added 'transform' prop so it moves with the object slightly
      */}
      <Html position={[0, -2, 0]} center zIndexRange={[100, 0]}>
        <div className="w-56 bg-stone-900/95 backdrop-blur-xl p-4 rounded-2xl border border-yellow-600/30 text-center select-none shadow-2xl">
          <h3 className="text-yellow-500 font-bold text-sm uppercase tracking-wider mb-1">{steps[step].label}</h3>
          <p className="text-gray-400 text-[11px] mb-4 h-8 leading-tight flex items-center justify-center">
            {steps[step].desc}
          </p>
          
          <div className="flex gap-3 justify-center items-center">
            <button 
                onClick={() => setStep(0)} 
                className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all ${step === 0 ? 'bg-stone-800 text-stone-600 cursor-not-allowed' : 'bg-stone-800 text-gray-400 hover:bg-stone-700'}`}
                disabled={step === 0}
            >
                Reset
            </button>
            
            {step < 3 ? (
              <button 
                onClick={() => setStep(step + 1)} 
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold px-6 py-2 rounded-lg text-[10px] uppercase tracking-wide shadow-lg transition-all transform active:scale-95"
              >
                Next Step
              </button>
            ) : (
              <div className="text-green-400 text-[10px] font-bold px-4 py-2 border border-green-500/30 rounded-lg bg-green-500/10">
                Complete
              </div>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default ChannapatnaMaker;