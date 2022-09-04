import React, { useContext } from 'react';
import Card from './Card';
import { GameContext } from './GameContext';

export default function TableauStack({ stackNum }) {
    const gameContext = useContext(GameContext);

    const getCardsJsx = () => {
        return gameContext.getCardsArrForThisStack("tableau", stackNum).map((card, i, arr) => {
            return <Card key={`tableau-card-${card.id}`} identity={card}/>
        })
    }

    return (
        //I need to add the class "empty" when there are no cards here
        <div className={'tableau-stack'} onClick={gameContext.board.tableau[`stack${stackNum}`].cardOrder.length > 0 ? null : gameContext.emptyTableauStackClickHandler} >

        STACK
           {getCardsJsx()}
        </div>
    )
}