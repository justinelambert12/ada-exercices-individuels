// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/13_poker.md

// ETAPE 1 : generation du deck
function shuffle(array) {
    // Je fais une copie du tableau en entrée pour ne pas le modifier directement
    let remainingArr = [...array];
    let shuffledArr = [];
    while (remainingArr.length > 0) {
        let randomIndex = Math.floor(Math.random() * remainingArr.length)
        // J'extrais un élément au hasard du tableau "remainingArr" que je vide au fur et à mesure
        let randomElement = remainingArr.splice(randomIndex, 1);
        // Je le mets dans mon tableau de sortie
        shuffledArr.push(randomElement[0]);
    }
    // console.log(shuffledArr);
    return shuffledArr;
}

function createDeck() {
    let deck = [];
    ["♠︎","♣︎","♡","♢"].forEach(symbol => {
        for (let i=1; i<=10; i++) {
            deck.push(i+symbol);
        }
        ["J","Q","K"].forEach(head => {
            deck.push(head+symbol);
        })
    })
    return shuffle(deck);
}

// console.log(createDeck());

// ETAPE 2 : Distribution de cartes
function deal(numberOfCards) {
    let playerHand = []
    if (numberOfCards < deck.length) {
        for (let i=0; i<numberOfCards; i++){
            // Retire la premiere carte du paquet et la met dans la main du joueur
            playerHand.push(deck.shift());
        }
    } else {
        console.log("Pas assez de cartes dans le paquet.")
    }
    return playerHand;
}

// ETAPE 3 : Tire le "flop" = les 5 cartes posées au centre du jeu
function flop() {
    let cards = [];
    // 1er tour : 1 carte brulee et 3 cartes sorties
    deal(1);
    cards = cards.concat(deal(3));
    // 2e tour : 1 carte brulee et 1 carte sortie
    deal(1);
    cards = cards.concat(deal(1));
    // 3e tour : 1 carte brulee et 1 carte sortie
    deal(1);
    cards = cards.concat(deal(1));

    return cards;
}

// Un tour :
// let deck = createDeck();
// // console.log("deck", deck)
// const player1 = deal(2);
// const player2 = deal(2);
// // console.log("players hand", player1, player2)
// let cards = flop();
// // console.log("cards on the board", cards);

// ETAPE 4 : approche orientee objet, introduction des cartes en classe
class Card {
    
    constructor(value, color) {
        if (["1","2","3","4","5","6","7","8","9","10","J","Q","K"].includes(value) 
        && ["♠︎","♣︎","♡","♢"].includes(color)) {
            this.value = value;
            this.color = color;
        }
    }

    display() {
        console.log(this.value+this.color);
    }
}
// let exampleCard = new Card("J", "♠︎");
// console.log(exampleCard);
// exampleCard.display();

// Je reecris une fonction pour créer un deck avec des objets Card
function createDeckCards() {
    let deck = [];
    ["♠︎","♣︎","♡","♢"].forEach(symbol => {
        for (let i=1; i<=10; i++) {
            deck.push(new Card(`${i}`, symbol));
        }
        ["J","Q","K"].forEach(head => {
            deck.push(new Card(head, symbol));
        })
    })
    return shuffle(deck);
}

// Un tour :
let deck = createDeckCards();
// console.log(deck);
const player1 = deal(2);
const player2 = deal(2);
// console.log("players hand", player1, player2);
let flopCards = flop();
// console.log("cards on the board", flopCards);
