import React from 'react';

const Navbar = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'perfect-xi', label: 'Perfect XI', icon: 'fas fa-clipboard-list' },
    { id: 'dream-matchup', label: 'Dream Matchup', icon: 'fas fa-microphone-alt' },
    { id: 'clash-titans', label: 'Clash of Titans', icon: 'fas fa-fist-raised' },
    { id: 'cric-quiz', label: 'CricQuiz Arena', icon: 'fas fa-question-circle' },
    { id: 'umpire-call', label: 'Umpire\'s Call', icon: 'fas fa-hand-point-up' },
    { id: 'cric-mentor', label: 'Cric-Mentor', icon: 'fas fa-user-graduate' },
    { id: 'time-machine', label: 'Time Machine', icon: 'fas fa-hourglass-half' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 overflow-x-auto no-scrollbar gap-2 md:gap-4">
          <div 
            className="flex-shrink-0 font-bold text-xl text-green-800 cursor-pointer mr-4 flex items-center gap-2"
            onClick={() => onNavigate('home')}
          >
            <i className="fas fa-cricket text-green-600"></i>
            <span className="hidden md:inline">CricLegends</span>
          </div>
          
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                activeView === item.id 
                ? 'bg-green-600 text-white shadow-md' 
                : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
              }`}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;