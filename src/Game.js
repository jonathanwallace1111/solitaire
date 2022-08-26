
import React, { useState, useEffect, useContext } from 'react'
import InGameMenu from './InGameMenu';
import Stock from './Stock';
import Waste from './Waste';
import Foundation from './Foundation';
import Tableau from './Tableau';
import { GameContext } from './GameContext';


export default function Game() {
    const [deck, setDeck] = useState(null);


    const gameContext = useContext(GameContext); 
    

    console.log(gameContext.deck);
    console.log(gameContext.board);


    const selectCard = () => {

    }

    const moveCard = () => {

    }

    const undo = () => {

    }

    const separateStockWasteFoundationAndTableau = (cards) => {
        let tempDeck = JSON.parse(JSON.stringify(cards));

        let stock = tempDeck.filter(c => c.location === "stock");
        let waste = tempDeck.filter(c => c.location === "waste");
        let foundation = tempDeck.filter(c => c.location === "foundation");
        let tableau = tempDeck.filter(c => c.location === "tableau");

        return [stock, waste, foundation, tableau];
    }

    // const [stock, waste, foundation, tableau] = separateStockWasteFoundationAndTableau(deck);

    // console.log(stock); 
    // console.log(waste); 
    // console.log(foundation); 
    // console.log(tableau); 

    const separateTableauIntoStacks = (cards) => {
        let tableauArr = JSON.parse(JSON.stringify(cards));
        let tableauStacksArr = [];
        let numOfStacks = 7

        for (let i = 0; i < numOfStacks; i++) {
            let stackNum = i + 1;
            let stack = tableauArr.filter(c => c.stackNum === stackNum);
            stack.sort((a, b) => a.numWithinStack - b.numWithinStack)
            tableauStacksArr.push(stack);
        }

        return tableauStacksArr;
    }

    // let tableauStacksArr = separateTableauIntoStacks(tableau); 

    // console.log(tableauStacksArr);

    return deck && (
        <div className={'game-outer-container'}>
            <InGameMenu />
            <div className={'stock-and-foundation-container'}>
                {/* <Stock cardsArr={stock} /> */}
                <Waste />
                {/* <Foundation cardsArr={foundation} />  */}
            </div>
            {/* <Tableau cardsArr={tableau} />  */}

        </div>
    )
}
