
import React, { useState, useEffect, useContext } from 'react'
import InGameMenu from './InGameMenu';
import Stock from './Stock';
import Waste from './Waste';
import Foundation from './Foundation';
import Tableau from './Tableau';
import { GameContext } from './GameContext';


export default function Game() {
    const gameContext = useContext(GameContext); 
    // console.log(gameContext.deck);
    // console.log(gameContext.board);
    // console.log(gameContext.board)

    return (
        <div className={'game-outer-container'}>
            {/* <InGameMenu /> */}
            <div className={'stock-and-foundation-container'}>
                <Stock />
                <Waste deck={gameContext.deck} />
                <Foundation /> 
            </div>
            <Tableau /> 

        </div>
    )
}
