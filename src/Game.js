
import React, { useState, useEffect } from 'react'
import InGameMenu from './InGameMenu'; 
import Stock from './Stock';
import Waste from './Waste'; 
import Foundation from './Foundation'; 
import Tableau from './Tableau'; 

export default function Game() {
    // const [deck, setDeck] = useState(null); 
    // const [tableau, setTableau] = useState(null); 
    // const [stock, setStock] = useState(null); 
    const [waste, setWaste] = useState(null); 
    const [foundation, setFoundation] = useState([]); 

    let PrevMoveArr = []; 

    let tempDeck, tempDeckDeepCopy, shuffledDeck, dealtCardsArr; 

    // useEffect( () => {
  
    //     tempDeck = createDeck(); 
    //     tempDeckDeepCopy = JSON.parse(JSON.stringify(tempDeck)); 

    //     shuffledDeck = shuffleDeck(tempDeckDeepCopy); 
    //     dealtCardsArr = dealCards(shuffledDeck);  

    // }, []);


    const createDeck = () => { 
        let suits = ['diamond', 'heart', 'club', 'spade'];
        let cardRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        let cardColor; 
        let tempDeck = []; 

        for (let i = 0; i < suits.length; i ++) {
            if (suits[i] === 'diamond' || suits[i] === 'heart') {
                cardColor = 'red'; 
            } else {
                cardColor = 'black';
            }
            for (let j = 0; j < cardRanks.length; j++) {
                let newCard = {
                    rank: j + 1,  
                    suit: suits[i], 
                    color: cardColor, 
                }
                tempDeck.push(newCard); 
            }
        }

        // console.log(tempDeck.length); 

        return tempDeck; 
    }

    const shuffleDeck = (deck) => {
        let shuffledDeck = []; 

        while (deck.length != 0) { 
            let randomIndex = Math.floor(Math.random() * deck.length); 
            shuffledDeck.push(deck[randomIndex]); 
            deck.splice(randomIndex, 1); 
        }

        return shuffledDeck; 
    }

    const dealCards = (shuffledDeck) => { 
        let tempTableau = shuffledDeck.slice(0, 28);         
        let tempStock = shuffledDeck.slice(28);
        
        let dealtCardsArr = [tempTableau, tempStock]; 

        return dealtCardsArr; 
    }

    const selectCard = () => { 

    }

    const moveCard = () => { 
        // record the move to an array for "undo" function. 
    }

    const undo = () => {

    }

    // Question for JP. 
    tempDeck = createDeck(); 
    tempDeckDeepCopy = JSON.parse(JSON.stringify(tempDeck)); 
    shuffledDeck = shuffleDeck(tempDeckDeepCopy); 
    dealtCardsArr = dealCards(shuffledDeck);  
    const [deck, setDeck] = useState(tempDeck); 
    const [tableau, setTableau] = useState(dealtCardsArr[0]); 
    const [stock, setStock] = useState(dealtCardsArr[1]); 



    return (
        <div className={'game-outer-container'}>
        <InGameMenu /> 
        <div className={'stock-and-foundation-container'}>
            <Stock cardsArr={stock} />
            <Waste />  
            <Foundation cardsArr={foundation} /> 
        </div>
        <Tableau cardsArr={tableau} /> 
    </div>
    )
}
