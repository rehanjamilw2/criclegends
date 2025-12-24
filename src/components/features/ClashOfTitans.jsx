import React, { useState } from 'react';
import { callGemini } from '../../services/api';
import { cricketData } from '../../data/cricketData';

const ClashOfTitans = () => {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);
    const allPlayers = cricketData.flatMap(c => c.players.map(p => ({...p, country: c.name})));

    const handleCompare = async () => {
        if(!player1 || !player2) return;
        setLoading(true);
        const prompt = `Compare cricket players: ${player1} vs ${player2}. detailed comparison and verdict.`;
        try { const result = await callGemini(prompt); setAnalysis(result); } catch(e) { setAnalysis("Error."); } finally { setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 fade-in">
            <div className="bg-indigo-900 text-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6"><i className="fas fa-fist-raised text-red-400"></i> Clash of Titans</h2>
                <div className="flex gap-4 mb-6">
                    <select className="bg-indigo-800 rounded-lg p-3 w-full" value={player1} onChange={(e) => setPlayer1(e.target.value)}>
                        <option value="">Player 1</option>
                        {allPlayers.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
                    </select>
                    <select className="bg-indigo-800 rounded-lg p-3 w-full" value={player2} onChange={(e) => setPlayer2(e.target.value)}>
                        <option value="">Player 2</option>
                        {allPlayers.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
                    </select>
                </div>
                <button onClick={handleCompare} disabled={loading || !player1 || !player2} className="w-full bg-red-500 font-bold py-3 rounded-lg">{loading ? "..." : "Compare"}</button>
                {analysis && <div className="mt-6 bg-indigo-800/50 p-4 rounded-xl whitespace-pre-wrap">{analysis}</div>}
            </div>
        </div>
    );
};
export default ClashOfTitans;