import React, { useState } from 'react';
import { cricketData } from '../data/cricketData';

const Home = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const filteredData = cricketData.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pb-12 fade-in">
      <div className="bg-slate-900 text-white py-20 px-4 text-center hero-pattern relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">Cric<span className="text-green-400">Legends</span></h1>
          <p className="text-xl text-gray-300 mb-8">The Ultimate Cricket Encyclopedia & AI Suite</p>
          <input type="text" placeholder="Search country..." className="w-full max-w-md px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-500 shadow-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map(country => (
            <div key={country.id} onClick={() => onSelect(country)} className="bg-white rounded-xl shadow-lg cursor-pointer transform transition hover:-translate-y-2 hover:shadow-2xl overflow-hidden group">
              <div className={`h-3 w-full ${country.theme.bg}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-5xl">{country.flag}</span>
                  <div className={`w-8 h-8 rounded-full ${country.theme.light} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}><i className={`fas fa-arrow-right ${country.theme.text}`}></i></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-700">{country.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{country.history}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;