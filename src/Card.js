import React, { useContext } from 'react';
import { GameContext } from './GameContext';


export default function Card({ identity }) {

    // const rank = props.identity.rank; // number 1 - 13 (Ace through King)
    // const suit = props.identity.suit; //Diamond, Heart, Club, or Spade.
    // const color = props.identity.color; // Black or Red
    // const location = props.identity.location; //Tableau, Stock, Waste, or Foundation
    // const stackNum = props.identity.stackNum; //number from 1 to 7. Stock and Waste only has one stack, tableau has 7, foundation has 4
    // const faceUpOrDown = props.identity.faceUpOrDown; // up or down

    const gameContext = useContext(GameContext); 

    const {
        rank,
        suit,
        color,
        location,
        stackNum,
        faceUpOrDown,
        topOfStackBool,
        selectedBool
    } = identity

    // const identity = props.identity;

    // const clickHandler = () => {
    //     let card = window.event.target;
    //     console.log(card.classList);
    //     if (!card.classList.contains('selected')) {
    //         card.classList.add('selected');
    //     } else if (card.classList.contains('selected')) {
    //         card.classList.remove('selected');
    //     }
    // }


    let srcString, tempRank, tempSuit, fileType, cardSRC;
    if (faceUpOrDown === 'down') {
        cardSRC = 'cards_img_png/blue_back.png'; //eventually I want to be able to change the color in options menu
    } else if (faceUpOrDown === 'up') {
        // code that associates var cardSRC to png of specific card
        fileType = 'png'

        //this can be switch case
        if (rank === 1) {
            tempRank = 'A';
        } else if (rank > 1 && rank < 11) {
            tempRank = rank;
        } else if (rank === 11) {
            tempRank = 'J';
        } else if (rank === 12) {
            tempRank = 'Q';
        } else if (rank === 13) {
            tempRank = 'K';
        }

        if (suit === 'diamond') {
            tempSuit = 'D';
        } else if (suit === 'club') {
            tempSuit = 'C';
        } else if (suit === 'heart') {
            tempSuit = 'H';
        } else if (suit === 'spade') {
            tempSuit = 'S';
        }


        srcString = 'cards_img_png/' + tempRank + tempSuit + '.' + fileType

        cardSRC = srcString;
    }

    let imgClass = `card ${faceUpOrDown} ${location} ${tempSuit} ${rank} ${selectedBool ? "selected" : ""}`; 

    let correctClickHandler = () => {
        let handler; 

        if (topOfStackBool) {
            if (location === "foundation") {
                handler = gameContext.foundationCardClickHandler; 
            } else if (location === "tableau") {
                handler = gameContext.tableauCardClickHandler; 
            }
        } else {
            handler = undefined; 
        }

        return handler
    }

    return (
        // card png aspect ratio is w=691 by h=1056  
        <img src={cardSRC} onClick={correctClickHandler()} className={imgClass} alt={suit + " : " + rank} /*width={172.75} height={264} */ width={100} height={152.82}></img>
        // <div>CARD</div>
    )
}
