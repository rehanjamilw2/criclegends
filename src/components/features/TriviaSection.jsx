import React, { useState } from 'react';
import { callGemini } from '../../services/api';

const TriviaSection = () => {
    const [questionData, setQuestionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    // ✅ Fallback Questions (Agar AI fail ho jaye to ye use honge)
    const fallbackQuestions = [
        {
            question: "Who has the most centuries in International Cricket?",
            options: ["Virat Kohli", "Sachin Tendulkar", "Ricky Ponting", "Jacques Kallis"],
            answerIndex: 1,
            fact: "Sachin Tendulkar has 100 international centuries."
        },
        {
            question: "Which team won the 1992 Cricket World Cup?",
            options: ["England", "Australia", "Pakistan", "India"],
            answerIndex: 2,
            fact: "Pakistan won under the captaincy of Imran Khan."
        },
        {
            question: "Who is known as the 'Universe Boss'?",
            options: ["Chris Gayle", "AB de Villiers", "MS Dhoni", "Brendon McCullum"],
            answerIndex: 0,
            fact: "Chris Gayle is famous for his T20 dominance."
        }
    ];

    const fetchQuestion = async () => {
        setLoading(true);
        setRevealed(false);
        setSelectedOption(null);
        setQuestionData(null);

        const prompt = `Generate a unique multiple-choice cricket trivia question in strict JSON format: 
        { "question": "...", "options": ["A", "B", "C", "D"], "answerIndex": 0, "fact": "Short explanation" }. 
        Do not use markdown. Just raw JSON.`;

        try {
            const res = await callGemini(prompt);
            
            const cleanText = res.replace(/```json|```/g, '').trim();
            
            const jsonStartIndex = cleanText.indexOf('{');
            const jsonEndIndex = cleanText.lastIndexOf('}');
            
            if (jsonStartIndex !== -1) {
                const data = JSON.parse(cleanText.substring(jsonStartIndex, jsonEndIndex + 1));
                setQuestionData(data);
            } else {
                throw new Error("Invalid JSON");
            }

        } catch (e) {
            console.warn("AI Failed, using fallback data:", e);
            // Agar AI fail ho, to random fallback question uthao
            const randomQ = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
            setQuestionData(randomQ);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionClick = (index) => {
        if (revealed) return; 
        setSelectedOption(index);
        setRevealed(true);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 fade-in">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-8 border-indigo-500 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 opacity-5 text-9xl text-indigo-900 pointer-events-none">
                    <i className="fas fa-question"></i>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <i className="fas fa-question-circle text-indigo-500"></i> CricQuiz Arena
                </h2>

                {/* Start / Loading State */}
                {!questionData && !loading && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 mb-6 text-lg">Test your cricket knowledge with AI-generated questions!</p>
                        <button 
                            onClick={fetchQuestion} 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg transform hover:scale-105"
                        >
                            Start Quiz
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="text-center py-10">
                        <i className="fas fa-spinner fa-spin text-4xl text-indigo-500 mb-4"></i>
                        <p className="text-gray-500">Curating a tough question...</p>
                    </div>
                )}

                {/* Question Display */}
                {questionData && (
                    <div className="animate-fade-in">
                        <h3 className="text-xl font-bold mb-6 text-gray-800">{questionData.question}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {questionData.options.map((opt, i) => {
                                // Styling Logic
                                let baseStyle = "p-4 border-2 rounded-xl cursor-pointer transition-all font-medium ";
                                if (!revealed) {
                                    baseStyle += "hover:bg-indigo-50 border-gray-200";
                                } else {
                                    if (i === questionData.answerIndex) {
                                        baseStyle += "bg-green-100 border-green-500 text-green-800"; // Sahi Jawab
                                    } else if (i === selectedOption) {
                                        baseStyle += "bg-red-100 border-red-500 text-red-800"; // Ghalat Click
                                    } else {
                                        baseStyle += "bg-gray-50 border-gray-200 opacity-60"; // Baaki Options
                                    }
                                }

                                return (
                                    <div 
                                        key={i} 
                                        onClick={() => handleOptionClick(i)} 
                                        className={baseStyle}
                                    >
                                        <span className="mr-2 font-bold">{String.fromCharCode(65 + i)}.</span> {opt}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Fact Reveal */}
                        {revealed && (
                            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 mb-6 animate-slide-up">
                                <h4 className="font-bold text-indigo-800 mb-1">
                                    <i className="fas fa-lightbulb text-yellow-500 mr-2"></i> Did you know?
                                </h4>
                                <p className="text-indigo-900">{questionData.fact}</p>
                            </div>
                        )}

                        {/* Next Button */}
                        {revealed && (
                            <div className="text-right">
                                <button 
                                    onClick={fetchQuestion} 
                                    className="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    Next Question <i className="fas fa-arrow-right ml-2"></i>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TriviaSection;