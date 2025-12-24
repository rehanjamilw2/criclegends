import React, { useState } from 'react';
import { callGemini } from '../../services/api';

const CricMentor = () => {
    const [role, setRole] = useState("Batsman");
    const [problem, setProblem] = useState("");
    const [advice, setAdvice] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetAdvice = async () => {
        if(!problem.trim()) return;
        setLoading(true);
        const prompt = `Cricket coach advice for a ${role}: "${problem}". short and technical.`;
        try { const result = await callGemini(prompt); setAdvice(result); } catch(e) { setAdvice("Coach busy."); } finally { setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 fade-in">
            <div className="bg-teal-700 text-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6"><i className="fas fa-user-graduate text-yellow-300"></i> Cric-Mentor</h2>
                <select className="w-full bg-teal-800 rounded-lg p-3 mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option>Batsman</option><option>Bowler</option>
                </select>
                <textarea className="w-full bg-teal-800 rounded-lg p-3 h-32 mb-4 text-white" value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Describe problem..."></textarea>
                <button onClick={handleGetAdvice} disabled={loading || !problem} className="w-full bg-yellow-400 text-teal-900 font-bold py-3 rounded-lg">{loading ? "..." : "Get Tips"}</button>
                {advice && <div className="mt-6 bg-teal-800/80 p-5 rounded-xl whitespace-pre-wrap">{advice}</div>}
            </div>
        </div>
    );
};
export default CricMentor;