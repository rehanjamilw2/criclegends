import React, { useState, useEffect } from 'react';
import { callGemini } from '../services/api';
import { cricketData } from '../data/cricketData';

const StrategyBoard = ({ countryName, players }) => {
    const [opponent, setOpponent] = useState("");
    const [captain, setCaptain] = useState("");
    const [strategy, setStrategy] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetStrategy = async () => {
        if(!opponent || !captain) return;
        setLoading(true);
        const prompt = `Strategy for ${captain} (${countryName}) vs ${opponent}.`;
        try { const result = await callGemini(prompt); setStrategy(result); } catch(e) { setStrategy("Error."); } finally { setLoading(false); }
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6 text-white mb-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><i className="fas fa-chess-king text-yellow-400"></i> Captain's Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <select className="bg-gray-700 rounded-lg p-3" value={captain} onChange={(e) => setCaptain(e.target.value)}>
                    <option value="">Captain</option>
                    {players.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
                </select>
                <select className="bg-gray-700 rounded-lg p-3" value={opponent} onChange={(e) => setOpponent(e.target.value)}>
                    <option value="">Opponent</option>
                    {cricketData.filter(c => c.name !== countryName).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <button onClick={handleGetStrategy} disabled={loading || !opponent || !captain} className="bg-yellow-500 text-gray-900 font-bold rounded-lg p-3">{loading ? "..." : "Plan"}</button>
            </div>
            {strategy && <div className="bg-gray-700 p-4 rounded-lg whitespace-pre-wrap">{strategy}</div>}
        </div>
    );
};

const CountryDetail = ({ country, onBack, onChatWithPlayer }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  
  return (
    <div className="min-h-screen pb-10 fade-in">
      <div className={`${country.theme.bg} text-white pt-10 pb-20 px-4 relative`}>
        <div className="max-w-6xl mx-auto relative z-10">
          <button onClick={onBack} className="mb-6 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full font-semibold"><i className="fas fa-arrow-left"></i> Back</button>
          <div className="flex items-center gap-6"><span className="text-8xl">{country.flag}</span><div><h1 className="text-5xl font-bold">{country.name}</h1></div></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <StrategyBoard countryName={country.name} players={country.players} />
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">History</h2>
          <p className="text-gray-600 leading-relaxed">{country.history}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {country.players.map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.role}</p>
              <button onClick={() => onChatWithPlayer(p)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm">Chat AI</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;