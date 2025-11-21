import React, { useState, useMemo } from 'react';
import { useTexture, Html, Center } from '@react-three/drei';
import * as THREE from 'three';

// Helper to generate grid dots
const DotsGrid = () => {
  const dots = useMemo(() => {
    const arr = [];
    for(let x = -1; x <= 1; x+=0.5) {
      for(let y = -1; y <= 1; y+=0.5) {
        // Diamond pattern logic
        if (Math.abs(x) + Math.abs(y) <= 1.6) { 
           arr.push([x, y, 0.06]);
        }
      }
    }
    return arr;
  }, []);
  
  return (
    <group>
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
};

const KolamMaker = () => {
  const [step, setStep] = useState(0);
  const texture = useTexture('/kolam.png');

  const steps = [
    { label: "1. Preparing the Floor", desc: "The entrance is cleaned and sprinkled with water." },
    { label: "2. Pulli (The Grid)", desc: "A grid of dots is laid out using rice flour to guide symmetry." },
    { label: "3. Neli (The Lines)", desc: "Curved lines are drawn around the dots, never stopping." },
    { label: "4. Completion", desc: "The geometric pattern is completed to welcome prosperity." }
  ];

  return (
    <group>
      <Center>
        <group rotation={[0, 0.2, 0]}>
          
          {/* BASE FLOOR */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3, 3, 0.1]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>

          {/* STAGE 2: DOTS */}
          {step >= 1 && step < 3 && <DotsGrid />}

          {/* STAGE 3: SIMPLE LINES (Procedural Torus Knots representing incomplete lines) */}
          {step === 2 && (
             <group>
               <mesh position={[0,0,0.06]}>
                 <torusGeometry args={[0.8, 0.02, 16, 100]} />
                 <meshStandardMaterial color="white" />
               </mesh>
               <mesh position={[0,0,0.06]} rotation={[0,0,0.78]}>
                 <torusGeometry args={[0.5, 0.02, 16, 100]} />
                 <meshStandardMaterial color="white" />
               </mesh>
             </group>
          )}

          {/* STAGE 4: FINAL TEXTURE REVEAL */}
          {step === 3 && (
             <mesh position={[0, 0, 0.06]}>
                <planeGeometry args={[2.8, 2.8]} />
                <meshStandardMaterial map={texture} transparent />
             </mesh>
          )}

          {/* FRAME */}
          <mesh position={[0, 0, -0.05]}>
            <boxGeometry args={[3.2, 3.2, 0.05]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      </Center>

      {/* UI CONTROLS */}
      <Html position={[0, -2, 0]} center zIndexRange={[100, 0]}>
        <div className="w-64 bg-stone-900/95 backdrop-blur-xl p-4 rounded-2xl border border-yellow-600/30 text-center select-none shadow-2xl">
          <h3 className="text-yellow-500 font-bold text-sm uppercase tracking-wider mb-1">{steps[step].label}</h3>
          <p className="text-gray-400 text-[11px] mb-4 h-8 leading-tight flex items-center justify-center">
            {steps[step].desc}
          </p>
          
          <div className="flex gap-3 justify-center items-center">
             {step > 0 && <button onClick={() => setStep(0)} className="px-2 py-1 rounded text-[10px] bg-stone-800 text-gray-400">Reset</button>}
             {step < 3 ? (
               <button onClick={() => setStep(step+1)} className="bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg text-[10px]">Next Step</button>
             ) : (
               <div className="text-green-400 text-[10px] font-bold px-4 py-2 bg-green-500/10 rounded-lg">Pattern Complete</div>
             )}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default KolamMaker;