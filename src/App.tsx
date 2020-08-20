import React from 'react';
import './App.css';
import Playlist from 'features/playlist/Playlist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Retro Electro</h1>
        <Playlist />
      </header>
    </div>
  );
}

export default App;
