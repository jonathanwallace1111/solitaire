import React from 'react'
import TableauStack from './TableauStack'; 


export default function Tableau() {

    let numOfStacks = 7;
    let stackComponentsArr = []; 
    for (let i = 0; i < numOfStacks; i++) {
        let newStack = <TableauStack key={i} stackNum={i +1} /> 
        stackComponentsArr.push(newStack); 
    }

    return (
        <div className={'tableau'}>
            Tableau
            {stackComponentsArr}
        </div>
    )
}
