import React, { useState, useEffect } from 'react'
import TableauStack from './TableauStack'; 

export default function Tableau(props) {

    const [stacksOfCardsArr, setStacksOfCardsArr] = useState([]); 
    const [numOfStacks, setNumOfStacks] = useState(7); 

    useEffect( () => {
        // let tempCardsArr = [...props.cardsArr];
        let tempCardsArr = props.cardsArr;

        let tempStackOfCardsArr = []; //better variable name. I think tempStacksArr might be better.
        let cardCount = 0; 
        let i = 0; 

        while (cardCount < tempCardsArr.length) {
            let stackNum = i + 1; 
            let numOfCardsInStack = stackNum;
            let stackArr = tempCardsArr.slice(cardCount, cardCount + numOfCardsInStack)

            cardCount += numOfCardsInStack
            
            stackArr.map(card => {
                card.location = 'tableau'; 
                card.stackNum = stackNum; 
            })
            tempStackOfCardsArr.push(stackArr)
            
            i++
        }

        setStacksOfCardsArr(tempStackOfCardsArr)
    }, []);


    let stackComponentsArr = []; 
    for (let i = 0; i < stacksOfCardsArr.length; i++) {
        let newStack = <TableauStack key={i} cardsArr={stacksOfCardsArr[i]} stackNum={i} location={'tableau'} /> //I don't like the way I just use i for stackNum here. 
        stackComponentsArr.push(newStack); 
    }

    return (
        <div className={'tableau'}>
            Tableau
            {stackComponentsArr}
        </div>
    )
}
