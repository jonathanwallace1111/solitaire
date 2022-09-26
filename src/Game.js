
import React, { useState, useEffect, useContext } from 'react'
import InGameMenu from './InGameMenu';
import Stock from './Stock';
import Waste from './Waste';
import Foundation from './Foundation';
import Tableau from './Tableau';
import { GameContext } from './GameContext';


export default function Game() {
    const gameContext = useContext(GameContext); 

    return (
        <div className={'game-outer-container'}>
            {/* <InGameMenu /> */}
            <div className={'stock-and-foundation-container'}>
                <Stock />
                <Waste/>
                <Foundation /> 
            </div>
            <Tableau /> 
        </div>
    )
}
