import React from 'react'
import './styles.css';
import Game from './Game';
import GameContextProvider from './GameContext';

export default function App() {
  return (
    <div>
      <GameContextProvider>
        <Game />
      </GameContextProvider>
    </div>
  )
}

