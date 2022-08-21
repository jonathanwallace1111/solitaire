import React, { useState, useEffect } from 'react'

export const GameContext = React.createContext({});

export default function GameContextProvider({ children }) {

    const [test, setTest] = useState('start'); 

    const finish = () => {
        setTest(test => 'finished'); 
    }

    const createDeck = () =>
        deckArrayToObject(
        [1,2,3,4,5,6,7,8,9,10,11,12,13].map((rank, r) => 
            ['spade', 'heart', 'club', 'diamond'].map((suit, s) => ({
                id: `${suit}${rank}`,
                suit: suit,
                rank:rank,
                location: "i don't know, a pile?",
                sortOrder: (s + 1) * (r + 1)
            }))    
        ).flat());

    const [deck, setDeck] = useState(createDeck())

    const changeCard = (cardId, property, value) => {
        
        let tmpDeck = deck;

        tmpDeck[cardId][property] = value;

        setDeck(deck => tmpDeck)
    }

    const deckArrayToObject = deckArray => deckArray.reduce((deckBuilder, card) => {
        deckBuilder[card.id] = card;
        return deckBuilder;
    }, {});

    const shuffleDeck = () => {

        let tmpDeckList = Object.values(deck).sort((a, b) => !!Math.round(Math.random()) ? 1 : -1)
                          .map((card, i) => ({...card, sortOrder: i}));

        setDeck(deck => deckArrayToObject(tmpDeckList));
    }

    const getSortedDeck = () => Object.values(deck).sort((a, b) => a.sortOrder > b.sortOrder ? 1 : -1);


    //// Region: Board

    const [board, setBoard] = useState({
        stock: {},
        waste: {},
        foundation: {},
        tableau: {
            stack1: {
                cardOrder: ["spade7", "heart3"]
            }
        }
    })

    const getTableauStackCards = stacNumber => board.tableau[`stack${stackNumber}`].cardOrder.map(cardId => deck[cardId]);

    return (
        <GameContext.Provider value={{
            deck,
            changeCard,
            getSortedDeck,
            shuffleDeck,
            board,
            getTableauStackCards,
        }}>{children}</GameContext.Provider>
    )
}