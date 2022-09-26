import React, { useContext } from 'react'
import Card from './Card';
import { GameContext } from './GameContext';


export default function Waste() {
    const gameContext = useContext(GameContext);

    // console.log(gameContext.getCardsArrForThisStack('waste', null)); 
    const getCardsJsx = () => {

        if (gameContext.board.waste.cardOrder.length > 0) {

            const cardsForThisStack = gameContext.getCardsArrForThisStack("waste", null); 

            let topCard = cardsForThisStack[cardsForThisStack.length - 1];

            console.log(cardsForThisStack);

            return <Card key={`waste-card-${topCard.id}`} identity={topCard} />
        } else {
            return
        }

    }

    return (
        <div className={'empty'} onClick={gameContext.board.waste.cardOrder.length > 0 ? null : gameContext.wasteClickHandler}>
            {gameContext.board.waste.cardOrder[gameContext.board.waste.cardOrder.length -1]}
            {getCardsJsx()}
        </div>
    )
}