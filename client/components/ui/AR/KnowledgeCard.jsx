import React from 'react';
import { motion } from 'framer-motion';
import { X, Play, MapPin } from 'lucide-react';

const KnowledgeCard = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      className="fixed bottom-20 left-4 right-4 bg-gray-900/95 backdrop-blur-xl border border-yellow-600/30 rounded-2xl p-5 shadow-2xl z-40 text-white"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">Detected</span>
          <h2 className="text-2xl font-bold text-white">{data.title}</h2>
        </div>
        <button onClick={onClose} className="p-1 bg-gray-800 rounded-full">
          <X size={20} />
        </button>
      </div>

      {/* Origin Tag */}
      <div className="flex items-center text-gray-400 text-sm mb-4">
        <MapPin size={14} className="mr-1" />
        <span>{data.origin || "Ancient India"}</span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        {data.description}
      </p>

      {/* Audio Button */}
      <button className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
        <Play size={18} fill="black" />
        Listen to Oral History
      </button>
    </motion.div>
  );
};

export default KnowledgeCard;