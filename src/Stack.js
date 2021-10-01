import React, { Component } from 'react';
import Card from './Card';


export default class Stack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // cardsArr: props.cardsArr, // cards in stack
            cardComponentsArr: [],
            stackNum: props.stackNum, // 1 - 7  (1 for drawstack, 1-4 for foundation, 1-7 for tableau)
            location: props.location, //tableau, drawStack, or foundation
        };
    }

    componentWillMount() {
        this.newStack();
    }

    newStack() {
        switch (this.props.location) {
            case 'drawStack':
                this.newDrawStack();
                break;
            case 'foundation':
                this.newFoundationStack();
                break;
            case 'tableau':
                this.newTableauStack();
                break;
            default:
                break;
        }
    }

    newDrawStack() {
        // let cardComponentsArr = []; 
        // if (this.props.cardsArr){
        //     for (let i = 0; i < this.props.cardsArr.length; i++) { 
        //         let newCard = <Card key={i} card={this.props.cardsArr[i]} />; 
        //         cardComponentsArr.push(newCard); 
        //     }
        // }   
    }

    newFoundationStack() {
        // let cardComponentsArr = []; 
        // if (this.props.cardsArr){
        //     for (let i = 0; i < this.props.cardsArr.length; i++) { 
        //         let newCard = <Card key={i} card={this.props.cardsArr[i]} />; 
        //         cardComponentsArr.push(newCard); 
        //     }
        // }   
    }

    newTableauStack() {
        let tempCardComponentsArr = [];
        for (let i = 0; i < this.props.cardsArr.length; i++) {
            let card = this.props.cardsArr[i]; 
            let newCardObject = {
                rank: card.rank, 
                suit: card.suit, 
                color: card.color, 
                location: 'tableau', 
                stackNum: this.props.stackNum, 
                faceUpOrDown: null  
            };
            if (i === this.props.cardsArr.length - 1) {
                newCardObject.faceUpOrDown = 'up';
            } else {
                newCardObject.faceUpOrDown = 'down'
            }

            let newCard = <Card key={i} cardObject={newCardObject} />;

            tempCardComponentsArr.push(newCard);
        }

        this.setState({ cardComponentsArr: tempCardComponentsArr });
    }

    addCard() {

    }

    removeCard() {

    }

    render() {
        // let cardComponentsArr = [];
        // if (this.props.cardsArr) {
        //     for (let i = 0; i < this.props.cardsArr.length; i++) {
        //         let newCard = <Card key={i} card={this.props.cardsArr[i]} />;
        //         cardComponentsArr.push(newCard);
        //     }
        // }
        return (

            <div className={this.props.location + '-stack'}>
                STACK
                   {this.state.cardComponentsArr}
            </div>

        )
    }
}
