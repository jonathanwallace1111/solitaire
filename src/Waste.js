import React, { useContext } from 'react'
import { GameContext } from './GameContext';


export default function Waste(props) {
    const gameContext = useContext(GameContext); 

    // console.log(gameContext.getCardsArrForThisStack('waste', null)); 
    
    return (
        <div className={'empty'} onClick={gameContext.board.waste.cardOrder.length > 0 ? null : gameContext.wasteClickHandler}>
            {gameContext.board.waste.cardOrder[gameContext.board.waste.cardOrder.length -1]}
        </div>
    )
}