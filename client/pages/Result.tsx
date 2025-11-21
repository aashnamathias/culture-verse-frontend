import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Import Makers from components folder
// @ts-ignore
import ChannapatnaMaker from '../components/ui/AR/ChannapatnaMaker';
// // @ts-ignore
// import BluePotteryMaker from '../components/ui/AR/BluePotteryMaker';
// @ts-ignore
import WarliMaker from '../components/ui/AR/WarliMaker';
// @ts-ignore
import KolamMaker from '../components/ui/AR/KolamMaker';
// @ts-ignore
// import MadhubaniMaker from '../components/ui/AR/MadhubaniMaker';

const Result = () => {
  const { id } = useParams();
  const [activeModel, setActiveModel] = useState<React.ReactNode>(null);
  const [info, setInfo] = useState({ title: "", location: "" });

  useEffect(() => {
    switch(id) {
        case 'channapatna':
            setActiveModel(<ChannapatnaMaker />);
            setInfo({ title: "Channapatna Toys", location: "Karnataka" });
            break;
        case 'blue-pottery':
            setActiveModel(<BluePotteryMaker />);
            setInfo({ title: "Jaipur Blue Pottery", location: "Rajasthan" });
            break;
        case 'warli':
            setActiveModel(<WarliMaker />);
            setInfo({ title: "Warli Art", location: "Maharashtra" });
            break;
        case 'kolam':
            setActiveModel(<KolamMaker />);
            setInfo({ title: "Kolam / Rangoli", location: "Tamil Nadu" });
            break;
        case 'madhubani':
            setActiveModel(<MadhubaniMaker />);
            setInfo({ title: "Madhubani Art", location: "Bihar" });
            break;
        default:
            setActiveModel(<div className="text-white text-center p-10">Unknown Craft</div>);
    }
  }, [id]);

  return (
    <div className="h-screen bg-stone-950 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 bg-stone-900 border-b border-stone-800 z-20">
        <Link to="/" className="p-2 bg-stone-800 rounded-full text-white hover:bg-stone-700">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-white font-bold text-lg">{info.title}</h1>
          <p className="text-yellow-500 text-xs uppercase tracking-wider">{info.location}</p>
        </div>
      </div>

      {/* Full Screen AR View */}
      <div className="flex-1 relative overflow-hidden bg-stone-900">
         {activeModel}
      </div>
    </div>
  );
};

export default Result;