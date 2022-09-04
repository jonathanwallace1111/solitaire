import React, { useContext } from 'react'
import { GameContext } from './GameContext'

export default function FoundationStack({ stackSuit }) {
    
    const gameContext = useContext(GameContext); 
    
    ///In here, I need to assign the card.topOfStack boolean value

    console.log(); 

    return (
        //I need to remove the "empty" class when I card is put here. 
        <div className={"empty foundation-stack"} onClick={gameContext.board.foundation[stackSuit].cardOrder.length > 0 ? null : gameContext. emptyFoundationStackClickHandler} >
            STACK {stackSuit}
        </div>
    )
}