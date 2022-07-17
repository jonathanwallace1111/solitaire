import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function TableauStack(props) {

    // const [cardsArr, setcardsArr] = useState(props.cardsArr); // cards in stack
    const [cardComponentsArr, setCardComponentsArr] = useState([]);
    // const [stackNum, setStackNum] = useState(props.stackNum); // 1 - 7  (1 for drawstack, 1-4 for foundation, 1-7 for tableau)



    const newTableauStack = () => {
        let tempCardComponentsArr = [];
        for (let i = 0; i < props.cardsArr.length; i++) {
            //There is a duplication of effort here. I already do a lot of this in the Tableau component
            let card = props.cardsArr[i]; 
            let newCardObject = {
                rank: card.rank, 
                suit: card.suit, 
                color: card.color, 
                location: 'tableau', 
                stackNum: props.stackNum, 
                faceUpOrDown: null  
            };
            if (i === props.cardsArr.length - 1) {
                newCardObject.faceUpOrDown = 'up';
            } else {
                newCardObject.faceUpOrDown = 'down'
            }

            let newCard = <Card key={i} cardObject={newCardObject} />;

            tempCardComponentsArr.push(newCard);
        }

        setCardComponentsArr(tempCardComponentsArr);
    }

    useEffect(() => {
        newTableauStack(); 
    }, [])

    const addCard = () => {

    }

    const removeCard = () => {

    }

    return (
        <div className={props.location + '-stack'}>
        STACK
           {cardComponentsArr}
        </div>
    )
}