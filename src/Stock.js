import React, { useEffect, useContext } from 'react'; 
import Card from './Card';
import { GameContext } from './GameContext';

export default function Stock() {
    const gameContext = useContext(GameContext);
    
    let stockCardsArr = gameContext.getCardsArrForThisStack("stock", null);
    // console.log(stockCardsArr);  
    
    let emptyOrNot = stockCardsArr.length < 1 ? "empty" : ""; 

    // console.log(gameContext.board);

    return (
        <div className={`stock ${emptyOrNot}`} onClick={gameContext.stockClickHandler} >
            {stockCardsArr?.length !== 0 &&
                <Card identity={stockCardsArr[stockCardsArr.length - 1]} />
            }
        </div>
    )
}
