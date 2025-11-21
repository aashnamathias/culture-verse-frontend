import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html } from '@react-three/drei';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// IMPORTS
import ChannapatnaToy from '../components/ui/AR/ChannapatnaToy';
import ChannapatnaMaker from '../components/ui/AR/ChannapatnaMaker';
import WarliArt from '../components/ui/AR/WarliArt';
import WarliMaker from '../components/ui/AR/WarliMaker';
import KolamArt from '../components/ui/AR/KolamArt';
import KolamMaker from '../components/ui/AR/KolamMaker';

// Make sure you moved these files into the AR folder too! 
// If they are still in components/, keep the old path for them.
// import BluePottery from '../components/ui/AR/BluePottery';
// import BluePotteryMaker from '../components/ui/AR/BluePotteryMaker';
// import MadhubaniArt from '../components/ui/AR/MadhubaniArt';
// import MadhubaniMaker from '../components/ui/AR/MadhubaniMaker';



const Loader = () => (
  <Html center><div className="text-yellow-500 text-xs font-bold animate-pulse">Loading...</div></Html>
);

const ArchiveItem = ({ title, subtitle, color, children, isDemo }) => (
  <div className={`bg-stone-900 border rounded-2xl overflow-hidden shadow-xl transition-all group ${isDemo ? 'border-green-500/30 hover:border-green-500' : 'border-stone-800 hover:border-yellow-600/50'}`}>
    <div className="p-4 border-b border-stone-800 bg-stone-950/50 flex justify-between items-center">
      <div>
        <h2 className={`text-lg font-bold ${isDemo ? 'text-green-400' : 'text-gray-100 group-hover:text-yellow-500'}`}>{title}</h2>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <div className={`w-3 h-3 rounded-full ${color} shadow-[0_0_10px_currentColor]`}></div>
    </div>

    <div className="h-64 w-full relative bg-gradient-to-b from-stone-800/50 to-stone-900/50">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={<Loader />}>
          <Stage intensity={0.5} environment="city" adjustCamera={1.2}>
            {children}
          </Stage>
        </Suspense>
        {/* Disable auto-rotate for Demos so we can click buttons easily */}
        <OrbitControls enableZoom={false} autoRotate={!isDemo} autoRotateSpeed={1.5} />
      </Canvas>
      
      <div className="absolute bottom-2 right-2 text-[10px] text-white/30 bg-black/20 px-2 rounded pointer-events-none">
        3D Interactive
      </div>
    </div>
  </div>
);

const Archive = () => {
  return (
    <div className="min-h-screen bg-stone-950 text-white pb-24">
      <div className="sticky top-0 bg-stone-950/90 backdrop-blur-md p-4 border-b border-stone-800 z-10 flex items-center gap-4">
        <Link to="/" className="p-2 bg-stone-900 rounded-full hover:bg-stone-800 transition"><ArrowLeft size={20} className="text-gray-400" /></Link>
        <div>
          <h1 className="text-xl font-serif text-yellow-500">The Saraswati Archive</h1>
          <p className="text-xs text-gray-500">Digital Preservation of Indian Heritage</p>
        </div>
      </div>

      <div className="p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        
        {/* --- CHANNAPATNA --- */}
        <ArchiveItem title="Channapatna Toys" subtitle="The Artifact" color="bg-red-500">
           <ChannapatnaToy />
        </ArchiveItem>
        <ArchiveItem title="Process: Wood Turning" subtitle="Interactive Demo" color="bg-green-500" isDemo>
           <ChannapatnaMaker />
        </ArchiveItem>

        {/* --- WARLI --- */}
        <ArchiveItem title="Warli Art" subtitle="The Artifact" color="bg-white">
           <WarliArt />
        </ArchiveItem>
        <ArchiveItem title="Process: Wall Painting" subtitle="Interactive Demo" color="bg-green-500" isDemo>
           <WarliMaker />
        </ArchiveItem>

        {/* --- KOLAM --- */}
        <ArchiveItem title="Kolam / Rangoli" subtitle="The Artifact" color="bg-pink-500">
           <KolamArt />
        </ArchiveItem>
        <ArchiveItem title="Process: Rice Floor Art" subtitle="Interactive Demo" color="bg-green-500" isDemo>
           <KolamMaker />
        </ArchiveItem>

      </div>
    </div>
  );
};

export default Archive;