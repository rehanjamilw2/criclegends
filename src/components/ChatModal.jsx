import React, { useState, useEffect, useRef } from 'react';
import { callGemini } from '../services/api';

const ChatModal = ({ player, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'model', text: `Hello! I am ${player.name}. Ask me anything about my career!` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const systemPrompt = `You are playing the role of ${player.name}. Role: ${player.role}. Stats: ${player.stats}. Keep answers concise.`;
      const responseText = await callGemini(input, systemPrompt);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Network error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col h-[500px]">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold">Chat with {player.name}</h3>
          <button onClick={onClose}><i className="fas fa-times"></i></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-3 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-white border mr-auto'}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && <div className="text-gray-400 text-xs">Typing...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t flex gap-2">
          <input className="flex-1 border rounded-full px-3 py-2 text-sm" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask something..." />
          <button onClick={handleSend} disabled={isLoading} className="bg-blue-600 text-white w-9 h-9 rounded-full"><i className="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;