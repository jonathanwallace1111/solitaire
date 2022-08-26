import React, { useState, useEffect } from 'react'
import TableauStack from './TableauStack'; 

export default function Tableau(props) {


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
