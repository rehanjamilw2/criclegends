import React, { useState } from 'react';
import { callGemini } from '../../services/api';
import { cricketData } from '../../data/cricketData';

const TimeMachine = () => {
    const [year, setYear] = useState("1992");
    const [team, setTeam] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTravel = async () => {
        if(!team || !year) return;
        setLoading(true);
        const prompt = `Describe the cricket vibe, team strength and jersey for ${team} in the year ${year}.`;
        try { const result = await callGemini(prompt); setDescription(result); } catch(e) { setDescription("Failed."); } finally { setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 fade-in">
            <div className="bg-orange-900 text-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6"><i className="fas fa-hourglass-half text-orange-300"></i> Time Machine</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <input type="number" className="bg-orange-800 rounded-lg p-3 text-white" value={year} onChange={(e) => setYear(e.target.value)} />
                    <select className="bg-orange-800 rounded-lg p-3 text-white" value={team} onChange={(e) => setTeam(e.target.value)}>
                        <option value="">Select Team</option>
                        {cricketData.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>
                <button onClick={handleTravel} disabled={loading || !team} className="w-full bg-orange-500 font-bold py-3 rounded-lg">{loading ? "..." : "Travel"}</button>
                {description && <div className="mt-6 bg-orange-800/80 p-5 rounded-xl italic whitespace-pre-wrap">{description}</div>}
            </div>
        </div>
    );
};
export default TimeMachine;