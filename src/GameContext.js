import React, { useState, useEffect } from 'react'

export const GameContext = React.createContext({});

export default function GameContextProvider({ children }) {

    const deckArrayToObject = deckArray => deckArray.reduce((deckBuilder, card) => {
        deckBuilder[card.id] = card;
        return deckBuilder;
    }, {});

    const createDeck = () => {
        let cards = makeCards();
        let shuffledCards = shuffleCards(cards);
        let shuffledCardsWithLocations = assignCardsLocations(shuffledCards);
        let shuffledCardsWithLocationsAndStacks = assignCardsStacks(shuffledCardsWithLocations)
        let deckArrayReorderedByKey = shuffledCardsWithLocationsAndStacks.sort((a, b) => {
            return a.key - b.key
        })
        let completedDeckObj = deckArrayToObject(deckArrayReorderedByKey); 

        return completedDeckObj;
    }

    const makeCards = () => {
        let suits = ['diamond', 'heart', 'club', 'spade'];
        let cardRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        let tempDeck = [];
        let cardColor;

        for (let i = 0; i < suits.length; i++) {
            if (suits[i] === 'diamond' || suits[i] === 'heart') {
                cardColor = 'red';
            } else {
                cardColor = 'black';
            }
            for (let j = 0; j < cardRanks.length; j++) {
                let newCard = {
                    rank: cardRanks[j],
                    suit: suits[i],
                    color: cardColor,
                    key: (i * cardRanks.length) + j,
                    id: `${suits[i]}${cardRanks[j]}`
                }
                tempDeck.push(newCard);
            }
        }

        return tempDeck;
    }

    const shuffleCards = (cards) => {
        let tempDeck = JSON.parse(JSON.stringify(cards));

        for (let i = tempDeck.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * i + 1);
            let tempCard = tempDeck[i];
            tempDeck[i] = tempDeck[randIndex];
            tempDeck[randIndex] = tempCard;
        }

        return tempDeck;
    }

    const assignCardsLocations = (cards) => {
        let tempDeck = JSON.parse(JSON.stringify(cards));

        let numCardsInTableau = 28;
        let numCardsInStock = 24;

        for (let i = 0; i < tempDeck.length; i++) {
            let card = tempDeck[i];

            if (i < numCardsInTableau) {
                card.location = 'tableau';
            } else {
                card.location = 'stock';
            }
        }

        return tempDeck;
    }

    const assignCardsStacks = (cards) => {
        let tempDeck = JSON.parse(JSON.stringify(cards));

        let tableau = tempDeck.filter(c => c.location === 'tableau');
        let stock = tempDeck.filter(c => c.location === 'stock');

        let newTableau = [];
        let cardCount = 0;
        let i = 0;

        while (cardCount < tableau.length) {
            let stackNum = i + 1;
            let numOfCardsInStack = stackNum;
            let stackArr = tableau.slice(cardCount, cardCount + numOfCardsInStack)

            cardCount += numOfCardsInStack

            for (let i = 0; i < stackArr.length; i++) {
                let card = stackArr[i];
                card.stackNum = stackNum;
                card.numWithinStack = i + 1;
            }

            newTableau.push(...stackArr);

            i++
        }

        tableau = newTableau;

        for (let i = 0; i < stock.length; i++) {
            let card = stock[i];
            card.stackNum = 1;
            card.numWithinStack = i + 1;
        }

        tempDeck = [...tableau, ...stock];

        return tempDeck;
    }



    //THIS IS JP'S WAY OF CREATING A DECK. I MIGHT REFACTOR MINE TO BE MORE LIKE THIS LATER, BUT FOR NOW I AM USING MY LONG WINDED CODE
    // const createDeck = () =>
    // deckArrayToObject(
    // [1,2,3,4,5,6,7,8,9,10,11,12,13].map((rank, r) => 
    //     ['spade', 'heart', 'club', 'diamond'].map((suit, s) => ({
    //         id: `${suit}${rank}`,
    //         suit: suit,
    //         rank:rank,
    //         location: "i don't know, a pile?",
    //         sortOrder: (s + 1) * (r + 1)
    //     }))    
    // ).flat());

    const createBoardObj = (cards) => {
        let tempDeck = JSON.parse(JSON.stringify(cards));

        let stock = tempDeck.filter(c => c.location === "stock").map(c => c.id);
        let tableau = tempDeck.filter(c => c.location === "tableau");

        let tableauStacksArr = [];
        let numOfTabStacks = 7
        for (let i = 0; i < numOfTabStacks; i++) {
            let stackNum = i + 1;
            let stack = tableau.filter(c => c.stackNum === stackNum);
            stack.sort((a, b) => a.numWithinStack - b.numWithinStack)
            stack = stack.map(c => c.id); 
            tableauStacksArr.push(stack);
        }


        let boardObj = {
            stock: {
                cardOrder: []
            }, 
            waste: {
                cardOrder: []
            }, 
            foundation: {
                clubs: {
                    cardOrder: []
                },
                diamonds: {
                    cardOrder: []
                }, 
                hearts: {
                    cardOrder: []
                },
                spades: {
                    cardOrder: []
                }
            }, 
            tableau: {
                stack1: {
                    cardOrder: tableauStacksArr[0]
                },
                stack2: {
                    cardOrder: tableauStacksArr[1]
                }, 
                stack3: {
                    cardOrder: tableauStacksArr[2]
                },
                stack4: {
                    cardOrder: tableauStacksArr[3]
                },
                stack5: {
                    cardOrder: tableauStacksArr[4]
                }, 
                stack6: {
                    cardOrder: tableauStacksArr[5]
                },
                stack7: {
                    cardOrder: tableauStacksArr[6]
                }
            }
        }

        return boardObj; 
    }


    ////below is more of JP's original code


    const changeCard = (cardId, property, value) => {
        
        let tmpDeck = deck;

        tmpDeck[cardId][property] = value;

        setDeck(deck => tmpDeck)
    }

    const shuffleDeck = () => {

        let tmpDeckList = Object.values(deck).sort((a, b) => !!Math.round(Math.random()) ? 1 : -1)
                          .map((card, i) => ({...card, sortOrder: i}));

        setDeck(deck => deckArrayToObject(tmpDeckList));
    }

    const getSortedDeck = () => Object.values(deck).sort((a, b) => a.sortOrder > b.sortOrder ? 1 : -1);


    //// Region: Board

    // const [board, setBoard] = useState({
    //     stock: {},
    //     waste: {},
    //     foundation: {},
    //     tableau: {
    //         stack1: {
    //             cardOrder: ["spade7", "heart3"]
    //         }
    //     }
    // })

    const getTableauStackCards = stackNumber => board.tableau[`stack${stackNumber}`].cardOrder.map(cardId => deck[cardId]);

    const [deck, setDeck] = useState(createDeck())
    const [board, setBoard] = useState(createBoardObj(Object.values(deck))); 

    return (
        <GameContext.Provider value={{
            deck,
            board, 
            changeCard,
            getSortedDeck,
            shuffleDeck,
            board,
            getTableauStackCards,
        }}>{children}</GameContext.Provider>
    )
}