import React, { useState } from 'react'

export default function Card(props) {

    //Some of this might eventually need to be converted to state. Definitely faceUpOrDown. 
    const rank = props.cardObject.rank; // number 1 - 13 (Ace through King)
    const suit = props.cardObject.suit; //Diamond, Heart, Club, or Spade.
    const color = props.cardObject.color; // Black or Red
    const location = props.cardObject.location; //Tableau, Stock, Waste, or Foundation
    const stackNum = props.cardObject.stackNum; //number from 1 to 7. Stock and Waste only has one stack, tableau has 7, foundation has 4
    const faceUpOrDown = props.cardObject.faceUpOrDown; // up or down

    const clickHandler = () => {
        let card = window.event.target;
        console.log(card.classList);
        if (!card.classList.contains('selected')) {
            card.classList.add('selected');
        } else if (card.classList.contains('selected')) {
            card.classList.remove('selected');
        }
    }


    let imgClass = "card " + faceUpOrDown;
    let srcString, tempRank, tempSuit, fileType, cardSRC;
    if (faceUpOrDown === 'down') {
        cardSRC = 'cards_img_png/blue_back.png'; //eventually I want to be able to change the color in options menu
    } else if (faceUpOrDown === 'up') {
        //code that associates var cardSRC to png of specific card
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

    return (
        // card png aspect ratio is w=691 by h=1056  
        <img src={cardSRC} onClick={clickHandler} className={imgClass} alt={suit + " : " + rank} /*width={172.75} height={264} */ width={100} height={152.82}></img>
    )
}
