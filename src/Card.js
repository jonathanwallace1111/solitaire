import React, { Component } from 'react'

export default class Card extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            rank: props.cardObject.rank, // number 1 - 13 (Ace through King)
            suit: props.cardObject.suit, //Diamond, Heart, Club, or Spade. 
            color: props.cardObject.color, // Black or Red
            location: props.cardObject.location, //Tableau, Drawdeck, or Foundation
            stackNum: props.cardObject.stackNum, //number from 1 to 7. drawdeck only has one stack, tableau has 7, foundation has 4
            faceUpOrDown: props.cardObject.faceUpOrDown // up or down
        };
    }

    clickHandler() { 
        let card = window.event.target; 
        console.log(card.classList); 
        if(!card.classList.contains('selected')){
            card.classList.add('selected'); 
        } else if (card.classList.contains('selected')) {
            card.classList.remove('selected'); 
        }
    }

    render() {
        let imgClass = "card " + this.state.faceUpOrDown; 
        let srcString, rank, suit, fileType;
        let cardSRC; 
        if (this.state.faceUpOrDown === 'down') {
            cardSRC = 'cards_img_png/blue_back.png'; //eventually I want to be able to change the color in options menu
        } else if (this.state.faceUpOrDown === 'up') {
            //code that associates var cardSRC to png of specific card
            fileType = 'png' 
            
            if (this.state.rank === 1) {
                rank = 'A'; 
            } else if (this.state.rank > 1 && this.state.rank < 11) {
                rank = this.state.rank; 
            } else if (this.state.rank === 11) {
                rank = 'J'; 
            } else if (this.state.rank === 12) {
                rank = 'Q'; 
            } else if (this.state.rank === 13) {
                rank = 'K'; 
            }

            if (this.state.suit === 'diamond') {
                suit = 'D'; 
            } else if (this.state.suit === 'club') {
                suit = 'C'; 
            } else if (this.state.suit === 'heart') {
                suit = 'H'; 
            } else if (this.state.suit === 'spade') {
                suit = 'S'; 
            }


            srcString = 'cards_img_png/' + rank + suit + '.' + fileType

            cardSRC =  srcString; 
        }
        
        return (
        //card png aspect ratio is w=691 by h=1056 
        <img src={cardSRC} onClick={this.clickHandler} className={imgClass} alt={this.state.suit + " : " + this.state.rank} /*width={172.75} height={264} */ width={100} height={152.82}></img>

        )
    }
}

