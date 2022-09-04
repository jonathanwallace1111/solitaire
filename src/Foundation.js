import React from 'react';
import FoundationStack from './FoundationStack';

export default function Foundation() {
    return (
        <div className={'foundation'}>
            FOUNDATION
            <FoundationStack stackSuit={"diamonds"} /> 
            <FoundationStack stackSuit={"clubs"} /> 
            <FoundationStack stackSuit={"hearts"} /> 
            <FoundationStack stackSuit={"spades"} /> 
        </div>
    )
}
