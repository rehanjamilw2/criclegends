import React, { useState } from 'react';
import { callGemini } from '../../services/api';
import { cricketData } from '../../data/cricketData';

const DreamMatchup = () => {
    const [bowler, setBowler] = useState("");
    const [batsman, setBatsman] = useState("");
    const [commentary, setCommentary] = useState("");
    const [loading, setLoading] = useState(false);
    const allPlayers = cricketData.flatMap(c => c.players.map(p => ({...p, country: c.name})));

    const generateCommentary = async () => {
        if (!bowler || !batsman) return;
        setLoading(true);
        const prompt = `Thrilling cricket commentary: ${bowler} bowling to ${batsman}. 1 over summary.`;
        try { const result = await callGemini(prompt); setCommentary(result); } catch(e) { setCommentary("Error."); } finally { setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 fade-in">
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 shadow-2xl text-white">
                <h2 className="text-3xl font-bold mb-6"><span className="text-yellow-400">✨</span> Dream Matchup</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <select className="bg-white/10 rounded-lg p-3" value={bowler} onChange={(e) => setBowler(e.target.value)}>
                        <option value="">Bowler</option>
                        {allPlayers.map((p, i) => <option key={i} value={p.name} className="text-black">{p.name}</option>)}
                    </select>
                    <div className="text-center font-bold text-xl pt-2">VS</div>
                    <select className="bg-white/10 rounded-lg p-3" value={batsman} onChange={(e) => setBatsman(e.target.value)}>
                        <option value="">Batsman</option>
                        {allPlayers.map((p, i) => <option key={i} value={p.name} className="text-black">{p.name}</option>)}
                    </select>
                </div>
                <button onClick={generateCommentary} disabled={loading || !bowler || !batsman} className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg">{loading ? "..." : "Simulate"}</button>
                {commentary && <div className="mt-6 bg-black/30 p-4 rounded-xl italic whitespace-pre-wrap">{commentary}</div>}
            </div>
        </div>
    );
};
export default DreamMatchup;