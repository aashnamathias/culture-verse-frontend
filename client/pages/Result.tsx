import React, { useEffect, useState, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber'; // Import Canvas
import { Stage, OrbitControls } from '@react-three/drei'; // Import Stage

// @ts-ignore
import ChannapatnaToy from '../components/ui/AR/ChannapatnaToy';
// @ts-ignore
import BluePottery from '../components/ui/AR/BluePottery';
// @ts-ignore
import WarliArt from '../components/ui/AR/WarliArt';
// @ts-ignore
import KolamArt from '../components/ui/AR/KolamArt';
// @ts-ignore
import MadhubaniArt from '../components/ui/AR/MadhubaniArt';

const Result = () => {
  const { id } = useParams();
  const [activeModel, setActiveModel] = useState<React.ReactNode>(null);
  const [info, setInfo] = useState({ title: "", location: "", desc: "" });

  useEffect(() => {
    switch(id) {
        case 'channapatna':
            setActiveModel(<ChannapatnaToy />);
            setInfo({ 
              title: "Channapatna Toys", 
              location: "Karnataka", 
              desc: "Traditional ivory-wood toys coated with non-toxic vegetable lacquer. The craft is protected as a Geographical Indication (GI)." 
            });
            break;
        case 'blue-pottery':
            setActiveModel(<BluePottery />);
            setInfo({ 
              title: "Jaipur Blue Pottery", 
              location: "Rajasthan",
              desc: "Unique pottery made from quartz stone powder, powdered glass, and gum. Known for its blue and white Persian-influenced patterns."
            });
            break;
        case 'warli':
            setActiveModel(<WarliArt />);
            setInfo({ 
              title: "Warli Art", 
              location: "Maharashtra",
              desc: "Tribal art using rice paste circles, triangles, and squares on red mud walls to depict social life."
            });
            break;
        case 'kolam':
            setActiveModel(<KolamArt />);
            setInfo({ 
              title: "Kolam", 
              location: "Tamil Nadu",
              desc: "Geometric floor patterns made with rice flour to welcome prosperity. It is a daily ritual of mathematical beauty."
            });
            break;
        case 'madhubani':
            setActiveModel(<MadhubaniArt />);
            setInfo({ 
              title: "Madhubani Art", 
              location: "Bihar",
              desc: "Folk art done with fingers, twigs, brushes, and matchsticks, characterized by eye-catching geometrical patterns."
            });
            break;
        default:
            setActiveModel(null);
    }
  }, [id]);

  return (
    <div className="h-screen bg-stone-950 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 bg-stone-900 border-b border-stone-800 z-20">
        <Link to="/" className="p-2 bg-stone-800 rounded-full text-white hover:bg-stone-700 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-white font-bold text-lg">{info.title || "Artifact Not Found"}</h1>
          <p className="text-yellow-500 text-xs uppercase tracking-wider">{info.location}</p>
        </div>
      </div>

      {/* AR Viewport */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-stone-900 to-black">
         <Suspense fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50">
                <Loader2 className="w-8 h-8 animate-spin mb-2 text-yellow-500" />
                <p className="text-xs text-gray-400">Loading 3D Asset...</p>
            </div>
         }>
            {/* THIS IS THE FIX: THE CANVAS WRAPPER */}
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
                {/* Stage handles lighting/shadows automatically */}
                <Stage intensity={0.5} environment="city" adjustCamera={false}>
                    {activeModel}
                </Stage>
                <OrbitControls autoRotate enableZoom={true} />
            </Canvas>
         </Suspense>
      </div>

      {/* Bottom Info Panel */}
      <div className="bg-stone-900 p-6 border-t border-stone-800 z-20">
        <h3 className="text-white font-bold mb-2">About this Craft</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {info.desc}
        </p>
        <Link to="/archive" className="mt-4 block w-full bg-yellow-600 text-black font-bold py-3 rounded-xl text-center hover:bg-yellow-500 transition-colors">
          View Full Archive & Process
        </Link>
      </div>
    </div>
  );
};

export default Result;