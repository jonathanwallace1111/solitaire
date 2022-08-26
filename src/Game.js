
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






    // useEffect(() => {
    //     let tempDeck = createDeck();
    //     setDeck(tempDeck);
    // }, []);

    ////// ALL OF THE BELOW FUNCTIONS THAT HAVE TO DO WITH MAKING AND SHUFFLING THE DECK ARE BEING MOVED TO GameContext.js

    // const createDeck = () => {
    //     let cards = makeCards();
    //     let shuffledCards = shuffleCards(cards);
    //     let shuffledCardsWithLocations = assignCardsLocations(shuffledCards);
    //     let shuffledCardsWithLocationsAndStacks = assignCardsStacks(shuffledCardsWithLocations);
    //     //this statement actually puts the cards in order by key, though the variable name still includes "shuffled"; 
    //     let completedDeck = shuffledCardsWithLocationsAndStacks.sort((a, b) => {
    //         return a.key - b.key
    //     })

    //     return completedDeck;
    // }

    // console.log(deck); 

    // const makeCards = () => {
    //     let suits = ['diamond', 'heart', 'club', 'spade'];
    //     let cardRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    //     let tempDeck = [];
    //     let cardColor;

    //     for (let i = 0; i < suits.length; i++) {
    //         if (suits[i] === 'diamond' || suits[i] === 'heart') {
    //             cardColor = 'red';
    //         } else {
    //             cardColor = 'black';
    //         }
    //         for (let j = 0; j < cardRanks.length; j++) {
    //             let newCard = {
    //                 rank: cardRanks[j],
    //                 suit: suits[i],
    //                 color: cardColor,
    //                 key: (i * cardRanks.length) + j
    //             }
    //             tempDeck.push(newCard);
    //         }
    //     }

    //     return tempDeck;
    // }

    // const shuffleCards = (cards) => {
    //     let tempDeck = JSON.parse(JSON.stringify(cards));

    //     for (let i = tempDeck.length - 1; i > 0; i--) {
    //         let randIndex = Math.floor(Math.random() * i + 1);
    //         let tempCard = tempDeck[i];
    //         tempDeck[i] = tempDeck[randIndex];
    //         tempDeck[randIndex] = tempCard;
    //     }

    //     return tempDeck;
    // }

    // const assignCardsLocations = (cards) => {
    //     let tempDeck = JSON.parse(JSON.stringify(cards));

    //     let numCardsInTableau = 28;
    //     let numCardsInStock = 24;

    //     for (let i = 0; i < tempDeck.length; i++) {
    //         let card = tempDeck[i];

    //         if (i < numCardsInTableau) {
    //             card.location = 'tableau';
    //         } else {
    //             card.location = 'stock';
    //         }
    //     }

    //     return tempDeck;
    // }

    // //for now, I am setting stackNum and numWithinStack to "i + 1" rather than going off the zero based array. 
    // // I feel like it would be strange for stack 3 to have 4 cards in it. Or for the 2nd card in a stack to be number one.
    // // It seems like if there are visual elements that you can actually see, then I shouldn't use the zero based array.  
    // const assignCardsStacks = (cards) => {
    //     let tempDeck = JSON.parse(JSON.stringify(cards));

    //     let tableau = tempDeck.filter(c => c.location === 'tableau');
    //     let stock = tempDeck.filter(c => c.location === 'stock');

    //     let newTableau = [];
    //     let cardCount = 0;
    //     let i = 0;

    //     while (cardCount < tableau.length) {
    //         let stackNum = i + 1;
    //         let numOfCardsInStack = stackNum;
    //         let stackArr = tableau.slice(cardCount, cardCount + numOfCardsInStack)

    //         cardCount += numOfCardsInStack

    //         for (let i = 0; i < stackArr.length; i++) {
    //             let card = stackArr[i];
    //             card.stackNum = stackNum;
    //             card.numWithinStack = i + 1;
    //         }

    //         newTableau.push(...stackArr);

    //         i++
    //     }

    //     tableau = newTableau;

    //     for (let i = 0; i < stock.length; i++) {
    //         let card = stock[i];
    //         card.stackNum = 1;
    //         card.numWithinStack = i + 1;
    //     }

    //     tempDeck = [...tableau, ...stock];

    //     return tempDeck;
    // }

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
