import React, { useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html, Center } from '@react-three/drei';

const BluePotteryMaker = () => {
  const [step, setStep] = useState(0);
  const groupRef = useRef();

  const steps = [
    { label: "1. The Dough", desc: "Unlike clay, this is a mix of Quartz powder, Glass powder, and Multani Mitti." },
    { label: "2. Casting / Molding", desc: "The dough is flattened and pressed into molds to create the shape." },
    { label: "3. Oxide Painting", desc: "Cobalt Oxide (Blue) and Copper Oxide (Green) are painted by hand." },
    { label: "4. Glazing & Firing", desc: "A glass glaze is applied. Heating at 800°C turns it shiny." }
  ];

  // --- 1. TEXTURE GENERATOR ---
  const potteryTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#00158f';
    ctx.fillRect(0, 0, 1024, 1024);

    const drawFlowerUnit = (cx, cy, scale) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.beginPath(); ctx.strokeStyle = 'white'; ctx.lineWidth = 8;
      ctx.moveTo(-60, 40); ctx.bezierCurveTo(-30, -40, 30, -40, 60, 40); ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.beginPath(); ctx.ellipse(-50, 0, 10, 25, -0.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(50, 0, 10, 25, 0.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, 50, 10, 25, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -10, 15, 0, Math.PI*2); ctx.fill();
      for(let i=0; i<5; i++) {
        const ang = (i/5)*Math.PI*2;
        ctx.beginPath(); ctx.ellipse(Math.sin(ang)*25, -10 + Math.cos(ang)*25, 8, 15, -ang, 0, Math.PI*2); ctx.fill();
      }
      ctx.restore();
    };

    const rows = 5; const cols = 8;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / cols) * 1024 + (r % 2 === 0 ? 0 : 60);
        const y = 200 + (r / rows) * 650; 
        drawFlowerUnit(x, y, 1.2);
      }
    }
    ctx.fillStyle = 'white';
    for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.ellipse((i/20)*1024, 950, 15, 60, 0, 0, Math.PI*2); ctx.fill(); }
    ctx.strokeStyle = 'white'; ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(0, 880); ctx.lineTo(1024, 880); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 1000); ctx.lineTo(1024, 1000); ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    tex.center.set(0.5, 0.5); tex.rotation = Math.PI; tex.flipY = false;
    return tex;
  }, []);

  // --- 2. THE SHAPE ---
  const vaseProfile = useMemo(() => {
    const p = [];
    p.push(new THREE.Vector2(0, 0)); p.push(new THREE.Vector2(1.4, 0)); p.push(new THREE.Vector2(1.3, 0.5));
    p.push(new THREE.Vector2(2.2, 1.2)); p.push(new THREE.Vector2(2.7, 2.2)); p.push(new THREE.Vector2(2.2, 3.2));
    p.push(new THREE.Vector2(1.4, 3.8)); p.push(new THREE.Vector2(1.8, 4.8)); p.push(new THREE.Vector2(1.6, 4.8));
    p.push(new THREE.Vector2(1.2, 3.8)); p.push(new THREE.Vector2(2.5, 2.2)); p.push(new THREE.Vector2(0, 0.2));
    return p;
  }, []);

  // --- 3. ANIMATION LOOP ---
  useFrame((state, delta) => {
    if (groupRef.current) {
      const speed = step < 3 ? 2 : 0.5;
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group>
      <Center>
        {/* SCALED DOWN TO 0.65 TO FIT SCREEN */}
        <group ref={groupRef} position={[0, -1.5, 0]} scale={0.65}>
          
          {/* STAGE 0: RAW DOUGH */}
          {step === 0 && (
             <mesh position={[0, 2, 0]}>
               <cylinderGeometry args={[1.5, 1.8, 2.5, 32]} />
               <meshStandardMaterial color="#e0e0e0" roughness={1} />
             </mesh>
          )}

          {/* STAGE 1: MOLDED */}
          {step === 1 && (
             <mesh>
               <latheGeometry args={[vaseProfile, 64]} />
               <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
             </mesh>
          )}

          {/* STAGE 2: PAINTED (Matte) */}
          {step === 2 && (
             <mesh>
               <latheGeometry args={[vaseProfile, 64]} />
               <meshStandardMaterial 
                 map={potteryTexture} 
                 roughness={1} 
                 metalness={0}
               />
             </mesh>
          )}

          {/* STAGE 3: GLAZED (Shiny) */}
          {step === 3 && (
             <mesh>
               <latheGeometry args={[vaseProfile, 128]} />
               <meshStandardMaterial 
                 map={potteryTexture} 
                 roughness={0.05} 
                 metalness={0.1}
                 envMapIntensity={1.5}
               />
             </mesh>
          )}

        </group>
      </Center>

      {/* UI CONTROLS - Adjusted Position */}
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
             
             {step < 3 ? (
               <button 
                 onClick={() => setStep(step+1)} 
                 className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg text-[10px] uppercase tracking-wide transition-transform active:scale-95"
               >
                 Next Step
               </button>
             ) : (
               <div className="text-green-400 text-[10px] font-bold px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                 Firing Complete
               </div>
             )}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default BluePotteryMaker;