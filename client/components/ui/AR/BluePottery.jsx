import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const BluePottery = () => {
  // --- 1. THE VIRTUAL PAINTER ---
  const potteryTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // A. BACKGROUND (Deep Jaipur Blue)
    ctx.fillStyle = '#00158f';
    ctx.fillRect(0, 0, 1024, 1024);

    // HELPER: Draw a single flower unit
    const drawFlowerUnit = (cx, cy, scale) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      
      // 1. Draw Vines (Thick curved lines)
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 8;
      ctx.moveTo(-60, 40);
      ctx.bezierCurveTo(-30, -40, 30, -40, 60, 40); // U shape
      ctx.stroke();

      // 2. Draw Leaves (Ellipses)
      ctx.fillStyle = 'white';
      ctx.beginPath(); ctx.ellipse(-50, 0, 10, 25, -0.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(50, 0, 10, 25, 0.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, 50, 10, 25, 0, 0, Math.PI*2); ctx.fill();

      // 3. Draw Flower Center
      ctx.beginPath();
      ctx.arc(0, -10, 15, 0, Math.PI*2);
      ctx.fill();
      
      // 4. Petals
      for(let i=0; i<5; i++) {
        const ang = (i/5)*Math.PI*2;
        ctx.beginPath();
        ctx.ellipse(Math.sin(ang)*25, -10 + Math.cos(ang)*25, 8, 15, -ang, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.restore();
    };

    // B. DRAW ROWS OF PATTERNS (Covering the whole body)
    const rows = 5; // How many layers of flowers vertically
    const cols = 8; // How many flowers per row around the pot

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Calculate Grid Position
        // X wraps around 0 to 1024
        const x = (c / cols) * 1024 + (r % 2 === 0 ? 0 : 60); // Offset every other row
        
        // Y goes from Bottom (200) to Neck (850)
        // We start at 200 because 0-200 is the very bottom base
        const y = 200 + (r / rows) * 650; 

        drawFlowerUnit(x, y, 1.2); // Draw big flowers
      }
    }

    // C. NECK STRIPES (Top Rim)
    ctx.fillStyle = 'white';
    for (let i = 0; i < 20; i++) {
       const x = (i/20) * 1024;
       ctx.beginPath();
       ctx.ellipse(x, 950, 15, 60, 0, 0, Math.PI*2);
       ctx.fill();
    }
    
    // D. RIM LINES
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(0, 880); ctx.lineTo(1024, 880); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 1000); ctx.lineTo(1024, 1000); ctx.stroke();

    // Create Texture
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.center.set(0.5, 0.5);
    tex.rotation = Math.PI; // Correct orientation
    tex.flipY = false;
    
    return tex;
  }, []);

  // --- 2. THE SHAPE (Rounded Belly) ---
  const vaseProfile = useMemo(() => {
    const p = [];
    p.push(new THREE.Vector2(0, 0));      // Center
    p.push(new THREE.Vector2(1.4, 0));    // Base
    p.push(new THREE.Vector2(1.3, 0.5));  // Indent
    
    // Smooth Belly Curve (Adding extra points for roundness)
    p.push(new THREE.Vector2(2.2, 1.2));  // Lower Belly
    p.push(new THREE.Vector2(2.7, 2.2));  // Mid Belly (Widest)
    p.push(new THREE.Vector2(2.2, 3.2));  // Upper Belly
    
    p.push(new THREE.Vector2(1.4, 3.8));  // Neck
    p.push(new THREE.Vector2(1.8, 4.8));  // Rim Flare
    p.push(new THREE.Vector2(1.6, 4.8));  // Inner Rim
    p.push(new THREE.Vector2(1.2, 3.8));  // Inner Neck
    p.push(new THREE.Vector2(2.5, 2.2));  // Inner Belly
    p.push(new THREE.Vector2(0, 0.2));    // Close
    return p;
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, -2.2, 0]}>
        <mesh>
          {/* Increased segments to 128 for super smooth roundness */}
          <latheGeometry args={[vaseProfile, 128]} />
          <meshStandardMaterial 
            map={potteryTexture} 
            roughness={0.05}     
            metalness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default BluePottery;