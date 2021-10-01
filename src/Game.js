import React, { Component } from 'react';
import InGameMenu from './InGameMenu'; 
import DrawStack from './DrawStack'; 
import Foundation from './Foundation'; 
import Tableau from './Tableau'; 

export default class Game extends Component {
    constructor() { 
        super(); 
        this.state = {
            deck: null, 
            tableau: null, 
            drawStack: null, 
            foundation: [] 
        }

        this.prevMoveArr = []; 

        this.newGame = this.newGame.bind(this); 
        this.createDeck = this.createDeck.bind(this); 
        this.shuffleDeck = this.shuffleDeck.bind(this); 
        this.dealCards = this.dealCards.bind(this); 
        this.selectCard = this.selectCard.bind(this); 
        this.moveCard = this.moveCard.bind(this); 
        this.undo = this.undo.bind(this); 
    }

    componentWillMount() {
        this.newGame(); 
    }

    newGame() { 
        let tempDeck = this.createDeck(); 
        let shuffledDeck = this.shuffleDeck(tempDeck); 
        let dealtCardsArr = this.dealCards(shuffledDeck); 
        let stateObject = {
            deck: tempDeck, 
            tableau: dealtCardsArr[0], 
            drawStack: dealtCardsArr[1]
        }

        this.setState(stateObject); 
    }

    createDeck() { 
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

        return tempDeck; 
    }

    shuffleDeck(deck) {
        let shuffledDeck = []; 

        while (deck.length != 0) { 
            let randomIndex = Math.floor(Math.random() * deck.length); 
            shuffledDeck.push(deck[randomIndex]); 
            deck.splice(randomIndex, 1); 
        }

        return shuffledDeck; 
    }

    dealCards(shuffledDeck) { 
        let tableau = shuffledDeck.slice(0, 28);         
        let drawStack = shuffledDeck.slice(28);
        
        let dealtCardsArr = [tableau, drawStack]; 

        return dealtCardsArr; 
    }

    selectCard() { 

    }

    moveCard() { 
        // record the move to an array for "undo" function. 
    }

    undo() {

    }

    render() {
        return (
            <div className={'game-outer-container'}>
                <InGameMenu /> 
                <div className={'drawstack-and-foundation-container'}>
                    <DrawStack cardsArr={this.state.drawStack} /> 
                    <Foundation cardsArr={this.state.foundation} /> 
                </div>
                <Tableau cardsArr={this.state.tableau} /> 
            </div>
        )
    }
}
