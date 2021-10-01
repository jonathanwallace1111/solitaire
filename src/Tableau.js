import React, { Component } from 'react'
import Stack from './Stack'; 

export default class Tableau extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            stacksOfCardsArr: [], 
            numOfStacks: 7
        }; 

    }

    componentWillMount() {
        let tempCardsArr = [...this.props.cardsArr];
        let tempStackOfCardsArr = []; 
        let cardCount = 0; 
        let i = 0; 

        while (cardCount < tempCardsArr.length) {
            let numOfCardsInStack = i + 1; 
            let stackNum = numOfCardsInStack;  
            let stackArr = tempCardsArr.slice(cardCount, cardCount + numOfCardsInStack)

            cardCount += numOfCardsInStack
            stackArr.map(card => {
                card.location = 'tableau'; 
                card.stackNum = stackNum; 
            })
            tempStackOfCardsArr.push(stackArr)
            
            i++
        }

        this.setState({ stacksOfCardsArr: tempStackOfCardsArr }); 

       
    }

    render() {
        let stackComponentsArr = []; 
        for (let i = 0; i < this.state.stacksOfCardsArr.length; i++) {
            let newStack = <Stack key={i} cardsArr={this.state.stacksOfCardsArr[i]} stackNum={i} location={'tableau'} /> 
            stackComponentsArr.push(newStack); 
        }

        return (
            <div className={'tableau'}>
                Tableau
                {stackComponentsArr}
            </div>
        )
    }
}
