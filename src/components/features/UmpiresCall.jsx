import React, { useState } from 'react';
import { callGemini } from '../../services/api';

const UmpiresCall = () => {
    const [rule, setRule] = useState("");
    const [explanation, setExplanation] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAskUmpire = async () => {
        if(!rule.trim()) return;
        setLoading(true);
        const prompt = `Explain cricket rule: "${rule}". Simple terms.`;
        try { const result = await callGemini(prompt); setExplanation(result); } catch(e) { setExplanation("Umpire reviewing..."); } finally { setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 fade-in">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-8 border-black">
                <h2 className="text-3xl font-bold text-gray-800 mb-6"><i className="fas fa-hand-point-up"></i> Umpire's Call</h2>
                <div className="flex gap-4 mb-6">
                    <input type="text" className="flex-1 border rounded-lg px-4 py-3" value={rule} onChange={(e) => setRule(e.target.value)} placeholder="Ask about LBW..." />
                    <button onClick={handleAskUmpire} disabled={loading || !rule} className="bg-black text-white font-bold px-6 py-3 rounded-lg">{loading ? "..." : "Ask"}</button>
                </div>
                {explanation && <div className="bg-gray-100 p-6 rounded-lg italic whitespace-pre-wrap">{explanation}</div>}
            </div>
        </div>
    );
};
export default UmpiresCall;