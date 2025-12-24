import React, { useState } from 'react';
import { callGemini } from '../../services/api';

const PerfectXI = () => {
    const [criteria, setCriteria] = useState("");
    const [team, setTeam] = useState("");
    const [loading, setLoading] = useState(false);

    const generateTeam = async () => {
        if(!criteria.trim()) return;
        setLoading(true);
        setTeam("");
        const prompt = `Create a cricket Playing XI based on: "${criteria}". List 11 players.`;
        try { const result = await callGemini(prompt); setTeam(result); } 
        catch(e) { setTeam("Error selecting team."); } 
        finally { setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 fade-in">
            <div className="bg-emerald-900 text-white rounded-xl shadow-lg p-8 relative border border-emerald-700">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><i className="fas fa-clipboard-list text-emerald-300"></i> Perfect XI Selector</h2>
                <div className="flex gap-4 mb-6">
                    <input type="text" placeholder="e.g., Best ODI Team 2010s..." className="flex-1 bg-emerald-800 rounded-lg px-4 py-3 text-white" value={criteria} onChange={(e) => setCriteria(e.target.value)} />
                    <button onClick={generateTeam} disabled={loading || !criteria} className="bg-emerald-500 px-6 py-3 rounded-lg font-bold">{loading ? "..." : "Build"}</button>
                </div>
                {team && <div className="bg-emerald-800/80 p-5 rounded-xl whitespace-pre-wrap">{team}</div>}
            </div>
        </div>
    );
};
export default PerfectXI;