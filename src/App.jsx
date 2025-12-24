import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatModal from './components/ChatModal';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';

// Features Imports
import PerfectXI from './components/features/PerfectXI';
import DreamMatchup from './components/features/DreamMatchup';
import ClashOfTitans from './components/features/ClashOfTitans';
import TriviaSection from './components/features/TriviaSection';
import UmpiresCall from './components/features/UmpiresCall';
import CricMentor from './components/features/CricMentor';
import TimeMachine from './components/features/TimeMachine';

function App() {
  const [view, setView] = useState('home');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [chatPlayer, setChatPlayer] = useState(null);

  const renderView = () => {
    switch(view) {
      case 'home': return <Home onSelect={(c) => { setSelectedCountry(c); setView('country'); }} />;
      case 'country': return <CountryDetail country={selectedCountry} onBack={() => setView('home')} onChatWithPlayer={setChatPlayer} />;
      case 'perfect-xi': return <PerfectXI />;
      case 'dream-matchup': return <DreamMatchup />;
      case 'clash-titans': return <ClashOfTitans />;
      case 'cric-quiz': return <TriviaSection />;
      case 'umpire-call': return <UmpiresCall />;
      case 'cric-mentor': return <CricMentor />;
      case 'time-machine': return <TimeMachine />;
      default: return <Home onSelect={(c) => { setSelectedCountry(c); setView('country'); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeView={view} onNavigate={setView} />
      {renderView()}
      {chatPlayer && <ChatModal player={chatPlayer} onClose={() => setChatPlayer(null)} />}
    </div>
  );
}

export default App;