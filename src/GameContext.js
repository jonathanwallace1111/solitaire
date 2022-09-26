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
                    id: `${suits[i]}${cardRanks[j]}`,
                    //below are variable, above are constant
                    topOfStackBool: false,  // I don't think I need topOfStackBool anymore. I think selectable is a better general identifier
                    selectable: false,
                    selectedBool: false,
                    stackNum: null, //this is only used for tableau. If the card isn't in the tableau, this should be null.
                    stackSuit: null, //this is only used for foundation. If the card isn't in the foundation, this should be null. 
                    faceUpOrDown: null,
                    location: null,
                    numWithinStack: null // I don't think I need this. I can just utilize their place within the array in the board object
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
                card.faceUpOrDown = 'down';
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

                if (i === stackArr.length - 1) {
                    card.faceUpOrDown = "up";
                    card.topOfStackBool = true;
                } else {
                    card.faceUpOrDown = "down";
                    card.topOfStackBool = false;
                }

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

    const shuffleDeck = () => {

        let tmpDeckList = Object.values(deck).sort((a, b) => !!Math.round(Math.random()) ? 1 : -1)
            .map((card, i) => ({ ...card, sortOrder: i }));

        setDeck(deck => deckArrayToObject(tmpDeckList));
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

    const getSortedDeck = () => Object.values(deck).sort((a, b) => a.sortOrder > b.sortOrder ? 1 : -1);

    const createBoardObj = (cards) => {
        let tempDeck = JSON.parse(JSON.stringify(cards));

        let stock = tempDeck.filter(c => c.location === "stock").map(c => c.id);
        let tableau = tempDeck.filter(c => c.location === "tableau");

        //This separates tableau into stacks 
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
                cardOrder: stock
            },
            waste: {
                cardOrder: []
            },
            foundation: {
                diamonds: {
                    cardOrder: []
                },
                clubs: {
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

    //This function only changes deck state, not board state. Fix this.
    const changeCard = (cardId, property, value) => {

        let tmpDeck = deck;

        tmpDeck[cardId][property] = value;

        console.log(cardId);

        setDeck(deck => tmpDeck)
    }

    //This function only changes deck state, not board state. Fix this.
    const changeCardLocation = (card, newLocation, stackNumOrStackSuit) => {
        //if newLocation is "tableau" then stackNumOrStackSuit should be a number. If new location is "foundation" then stackNumOrStackSuit should be a suit
        //if newLocation is "stock" or "waste" then stackNumOrStackSuit should be null 

        const changeOrders = [[card.id, "location", newLocation]];

        switch (newLocation) {
            case "stock":
                changeOrders.push([card.id, "faceUpOrDown", "down"]);
                break;
            case "waste":
                changeOrders.push([card.id, "faceUpOrDown", "up"]);

                break;
        }

        changeCardBulk(changeOrders)
    }


    //This function only changes deck state, not board state. Fix this.
    const changeCardBulk = changeOrders => {

        let tmpDeck = deck;

        changeOrders.forEach(([cardId, property, value]) => {
            tmpDeck[cardId][property] = value;
        })

        setDeck(deck => tmpDeck);
    }

    const moveCardToNewTableauStack = (newTableauStackNum) => {
        //in here I need to set the card's stackSuit to null, because stack num will be used here. 
        let tempDeck = { ...deck };
        let tempBoard = { ...board };
        let selectedCard = tempDeck[selectedCardID];

        let pathToNewTableauStackCardIDArr = tempBoard.tableau[`stack${newTableauStackNum}`].cardOrder;
        console.log(pathToNewTableauStackCardIDArr); 

        if (pathToNewTableauStackCardIDArr.length > 0) {
            let topCardOfNewStackBeforeMovingSelectedCard = tempDeck[pathToNewTableauStackCardIDArr[pathToNewTableauStackCardIDArr.length - 1]];
            topCardOfNewStackBeforeMovingSelectedCard.topOfStackBool = false;
        }

        //this block is chagning the board  
        // this code only works for moving a single card
        let pathToCardIDArrForSelectedCardStack;
        if (selectedCard.location === "waste") {
            pathToCardIDArrForSelectedCardStack = tempBoard.waste.cardOrder
        } else if (selectedCard.location === "foundation") {
            pathToCardIDArrForSelectedCardStack = tempBoard.foundation[selectedCard.stackSuit].cardOrder
        } else if (selectedCard.location === "tableau") {
            pathToCardIDArrForSelectedCardStack = tempBoard.tableau[`stack${selectedCard.stackNum}`].cardOrder;
        }
        pathToNewTableauStackCardIDArr.push(pathToCardIDArrForSelectedCardStack.pop())

        //This code is ugly. all it's meant to do is change the topOfStackBool property (to true) of the card we just uncovered after moving the selected card
        //It is also meant to make the newly uncovered card's faceUpOrDown property to change to "up"
        let pathToCardIDArrForPreviouslySelectedStack = pathToCardIDArrForSelectedCardStack;
        if (pathToCardIDArrForPreviouslySelectedStack.length > 0) {
            let newTopCardOfPreviousStack = tempDeck[pathToCardIDArrForPreviouslySelectedStack[pathToCardIDArrForPreviouslySelectedStack.length - 1]];
            newTopCardOfPreviousStack.topOfStackBool = false;
            newTopCardOfPreviousStack.faceUpOrDown = "up";
        }

        //this block is changing deck
        selectedCard.location = "tableau";
        selectedCard.stackNum = newTableauStackNum;
        selectedCard.stackSuit = null;


        setBoard(board => tempBoard);
        setDeck(deck => tempDeck);
        unselectCard();

    }

    //This function only changes deck state, not board state. Fix this.
    const moveCardToNewFoundationStack = () => {
        //In here I need to set the card's stackNum to null, because stackSuit will used here. 

        unselectCard();
    }

    const changeFaceUpOrDown = (card, value) => {
        changeCard(card.id, "faceUpOrDown", value);
    }

    const getCardsArrForThisStack = (location, stackNumber) => {
        if (stackNumber === null) {
            return board[location].cardOrder.map(cardId => deck[cardId]);
        } else {
            return board[location][`stack${stackNumber}`].cardOrder.map(cardId => deck[cardId]);
        }
    }

    const getStockCards = () => board.stock.cardOrder.map(cardID => deck[cardID]);

    const stockClickHandler = (e) => {
        let tempBoardObj = { ...board };
        let tempDeck = { ...deck };

        if (tempBoardObj.stock.cardOrder.length > 0) {
            let idOfCardToBeRemovedFromStock = tempBoardObj.stock.cardOrder[tempBoardObj.stock.cardOrder.length - 1];
            changeCardLocation(tempDeck[idOfCardToBeRemovedFromStock], "waste", null);
            tempBoardObj.waste.cardOrder.push(tempBoardObj.stock.cardOrder.pop());
            //set board is done here because changeCardLocation() doesn't mess with board as of now. 
            setBoard(board => tempBoardObj);
        } else {
            moveAllOfWasteBackToStock(); 
        }

        if (cardSelectedBool) {
            unselectCard();
        }
    }

    const moveAllOfWasteBackToStock = () => {
        let tempDeck = { ...deck };
        let tempBoard = { ...board }; 

        //this is all changing the deck
        let wasteCardsArr = getCardsArrForThisStack("waste", null); 
        wasteCardsArr.reverse(); 
        wasteCardsArr.forEach( (c, i, arr) => {
            if (i === arr.length - 1) {
                c.topOfStackBool = true; 
            } else {
                c.topOfStackBool = false; 
            }

            c.selectable = false;
            c.selectedBool = false; 
            c.stackNum = null;
            c.stackSuit = null;
            c.faceUpOrDown = "down";
            c.location = "stock"; 
            c.numWithinStack = i + 1; 
        })

        //this is all changing the board
        board.stock.cardOrder = board.waste.cardOrder.reverse(); 
        board.waste.cardOrder = []; 

        setDeck(deck => tempDeck);
        setBoard(board => tempBoard); 
    }

    const wasteClickHandler = (e) => {
        if (cardSelectedBool) {
            unselectCard();
        }
    }

    const selectCard = (cardID) => {
        let tempDeck = { ...deck };
        tempDeck[cardID].selectedBool = true;

        setDeck(deck => tempDeck);
        setCardSelectedBool(cardSelectedBool => true);
        setSelectedCardID(selectedCardID => cardID);
    }

    const unselectCard = () => {
        let tempDeck = { ...deck };
        tempDeck[selectedCardID].selectedBool = false;
        setDeck(deck => tempDeck);
        setCardSelectedBool(cardSelectedBool => false);
    }

    //Okay, I think this function might be stupid. All I need is the card ID then I can access all other variables through the actual card itself
    const getCardIDFromClassListArr = classesStringArray => {
        let cardSuit, cardRank, cardID;

        //Get suit value from event.target.className
        if (classesStringArray.includes("D")) {
            cardSuit = "diamond";
        } else if (classesStringArray.includes("C")) {
            cardSuit = "club";
        } else if (classesStringArray.includes("H")) {
            cardSuit = "heart";
        } else if (classesStringArray.includes("S")) {
            cardSuit = "spade";
        }

        // Get rank from event.target.className
        classesStringArray.forEach(classString => {
            let regex = /\d{1,2}/
            if (regex.test(classString)) {
                cardRank = classString;
            }
        })

        cardID = `${cardSuit}${cardRank}`;

        return cardID;
    }

    const tableauCardClickHandler = (e) => {
        const classListArr = e.target.className.split(" ");

        const newlySelectedCard = deck[getCardIDFromClassListArr(classListArr)];

        if (!cardSelectedBool) {
            selectCard(newlySelectedCard.id);
        } else if (cardSelectedBool && newlySelectedCard.id === selectedCardID) {
            unselectCard();
        } else if (cardSelectedBool) {
            const previouslySelectedCard = deck[selectedCardID];

            if (newlySelectedCard.color != previouslySelectedCard.color && newlySelectedCard.rank === previouslySelectedCard.rank + 1) {
                moveCardToNewTableauStack(newlySelectedCard.stackNum);
            }



        }
    }

    const foundationCardClickHandler = (e) => {

    }

    const emptyFoundationStackClickHandler = (e) => {
        console.log("empty foundation stack handler");
    }

    const emptyTableauStackClickHandler = (e) => {
        console.log("empty tableau stack handler");
    }

    const moveCard = () => {

    }

    const undo = () => {

    }

    //putting all state instatiations at the bottom here. 
    const [deck, setDeck] = useState(createDeck())
    const [board, setBoard] = useState(createBoardObj(Object.values(deck)));
    const [cardSelectedBool, setCardSelectedBool] = useState(false);
    const [selectedCardID, setSelectedCardID] = useState(null);

    // console.log(board); 


    return (
        <GameContext.Provider value={{
            deck,
            board,

            //ChangeCard + Wrappers
            changeCard,
            changeCardBulk,
            changeFaceUpOrDown,
            changeCardLocation,

            //click handlers
            stockClickHandler,
            foundationCardClickHandler,
            tableauCardClickHandler,
            wasteClickHandler,
            emptyFoundationStackClickHandler,
            emptyTableauStackClickHandler,

            getSortedDeck,
            shuffleDeck,
            board,
            getCardsArrForThisStack,
            getStockCards
        }}>{children}</GameContext.Provider>
    )
}