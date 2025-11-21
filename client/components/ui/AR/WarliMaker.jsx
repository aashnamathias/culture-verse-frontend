import React, { useState, useMemo } from 'react';
import { useTexture, Html, Center } from '@react-three/drei';
import { DoubleSide } from 'three';

// --- HELPER: A Simple 3D Warli Stick Figure ---
const WarliSketch = ({ position, rotation, scale = 0.5 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    {/* Head */}
    <mesh position={[0, 0.6, 0]}>
      <circleGeometry args={[0.15, 32]} />
      <meshBasicMaterial color="white" side={DoubleSide} />
    </mesh>
    {/* Body (Two Triangles) */}
    <mesh position={[0, 0.25, 0]}>
      <coneGeometry args={[0.25, 0.5, 3]} /> 
      <meshBasicMaterial color="white" />
    </mesh>
    <mesh position={[0, -0.25, 0]} rotation={[0, 0, 3.14]}>
      <coneGeometry args={[0.25, 0.5, 3]} /> 
      <meshBasicMaterial color="white" />
    </mesh>
    {/* Limbs */}
    <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, -0.5]}>
       <planeGeometry args={[0.05, 0.4]} />
       <meshBasicMaterial color="white" side={DoubleSide} />
    </mesh>
    <mesh position={[-0.3, 0.3, 0]} rotation={[0, 0, 0.5]}>
       <planeGeometry args={[0.05, 0.4]} />
       <meshBasicMaterial color="white" side={DoubleSide} />
    </mesh>
  </group>
);

// --- HELPER: The Tarpa Dance Circle ---
const TarpaCircle = () => {
  const dancers = useMemo(() => {
    return new Array(8).fill(0).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 0.6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { pos: [x, y, 0], rot: [0, 0, angle + 1.57] }; // +1.57 to face center
    });
  }, []);

  return (
    <group>
       {dancers.map((d, i) => (
         <WarliSketch key={i} position={d.pos} rotation={d.rot} scale={0.35} />
       ))}
       {/* The Musician in Center */}
       <WarliSketch position={[0,0,0]} rotation={[0,0,0]} scale={0.4} />
    </group>
  );
};

// --- MAIN COMPONENT ---
const WarliMaker = () => {
  const [step, setStep] = useState(0);
  const texture = useTexture('/warli.jpg');

  const steps = [
    { label: "1. The Mud Wall", desc: "Village huts are built using a mixture of earth, cow dung, and branches." },
    { label: "2. The Geru Wash", desc: "The wall is plastered with red ochre (Geru) to create the canvas." },
    { label: "3. The Border", desc: "A geometric border is painted first to define the sacred space." },
    { label: "4. Basic Figures", desc: "Simple Triangles and Circles are drawn to represent humans." },
    { label: "5. The Tarpa Dance", desc: "Dancers link hands in a spiral, representing the circle of life." }, // <--- NEW STEP
    { label: "6. The Masterpiece", desc: "Nature details are added to complete the story." }
  ];

  // Wall Color Logic
  const wallColor = step === 0 ? "#5D4037" : "#8B3A3A";

  return (
    <group>
      <Center>
        <group rotation={[0, -0.2, 0]}>
          
          {/* 1. THE WALL BASE */}
          <mesh>
            <boxGeometry args={[3, 2.2, 0.1]} />
            <meshStandardMaterial color={wallColor} roughness={0.9} />
          </mesh>

          {/* 2. STAGE 3: THE BORDER (White Lines) */}
          {step >= 2 && step < 5 && (
             <group position={[0, 0, 0.06]}>
                <mesh position={[0, 0.9, 0]}> <planeGeometry args={[2.6, 0.05]} /> <meshBasicMaterial color="white" /> </mesh>
                <mesh position={[0, -0.9, 0]}> <planeGeometry args={[2.6, 0.05]} /> <meshBasicMaterial color="white" /> </mesh>
                <mesh position={[-1.3, 0, 0]}> <planeGeometry args={[0.05, 1.8]} /> <meshBasicMaterial color="white" /> </mesh>
                <mesh position={[1.3, 0, 0]}> <planeGeometry args={[0.05, 1.8]} /> <meshBasicMaterial color="white" /> </mesh>
             </group>
          )}

          {/* 3. STAGE 4: SCATTERED FIGURES */}
          {step >= 3 && step < 5 && (
             <group position={[0, 0, 0.07]}>
                <WarliSketch position={[-0.8, 0.5, 0]} rotation={[0,0,0.1]} />
                <WarliSketch position={[0.8, 0.5, 0]} rotation={[0,0,-0.1]} />
                <WarliSketch position={[-0.8, -0.5, 0]} rotation={[0,0,-0.1]} />
                <WarliSketch position={[0.8, -0.5, 0]} rotation={[0,0,0.1]} />
             </group>
          )}

          {/* 4. STAGE 5: THE CENTRAL DANCE (Fills the empty space) */}
          {step === 4 && (
            <group position={[0, 0, 0.07]}>
               <TarpaCircle />
            </group>
          )}

          {/* 5. STAGE 6: FINAL TEXTURE */}
          {step === 5 && (
             <mesh position={[0, 0, 0.06]}>
               <planeGeometry args={[2.8, 2]} />
               <meshStandardMaterial map={texture} transparent={true} roughness={0.8} />
             </mesh>
          )}

          {/* 6. THE BAMBOO BRUSH (Only Visible Steps 2, 3, 4) */}
          {/* Logic: Visible if step is 2, 3, or 4. GONE at 5. */}
          {step >= 2 && step < 5 && (
             <group position={[1.2, -0.8, 0.3]} rotation={[0, 0, -0.5]}>
               <mesh> <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} /> <meshStandardMaterial color="#E3C099" /> </mesh>
               <mesh position={[0, 0.75, 0]}> <sphereGeometry args={[0.03, 16, 16]} /> <meshStandardMaterial color="white" /> </mesh>
             </group>
          )}
          
          {/* 7. FRAME */}
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[3.2, 2.4, 0.08]} />
            <meshStandardMaterial color="#3e2723" roughness={0.6} />
          </mesh>

        </group>
      </Center>

      {/* UI CONTROLS */}
      <Html position={[0, -2.2, 0]} center zIndexRange={[100, 0]}>
        <div className="w-64 bg-stone-900/95 backdrop-blur-xl p-4 rounded-2xl border border-yellow-600/30 text-center select-none shadow-2xl">
          <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-1">{steps[step].label}</h3>
          <p className="text-gray-400 text-[10px] mb-4 h-8 leading-tight flex items-center justify-center">
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
             
             {step < 5 ? (
               <button 
                 onClick={() => setStep(step+1)} 
                 className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg text-[10px] uppercase tracking-wide transition-transform active:scale-95"
               >
                 Next Step
               </button>
             ) : (
               <div className="text-green-400 text-[10px] font-bold px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                 Complete
               </div>
             )}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default WarliMaker;