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
        const availableValues = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        const availableColors = ["♠︎","♣︎","♡","♢"];
        if (availableValues.includes(value) 
        && availableColors.includes(color)) {
            this.value = value;
            this.color = color;
        }
    }
    
    toString() {
        return this.value+this.color;
    }

    display() {
        console.log(this.toString());
    }

    setOneToAce() {
        if (this.value === "1") {
            this.value = "A";
        }
    }

    setAceToOne() {
        if (this.value === "A") {
            this.value = "1";
        }
    }

    isAce() {
        return (this.value === "1" || this.value === "A");
    }

    hasSameValueAs(otherCard) {
        if (this.isAce()) {
            return otherCard.isAce();
        }
        return (this.value === otherCard.value);
    }

    hasSameColorAs(otherCard) {
        return (this.color === otherCard.color);
    }

    hasHigherValueAs(otherCard) {
        const sortedValues = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        return (sortedValues.indexOf(this.value) > sortedValues.indexOf(otherCard.value));
    }

    isSuiteOf(otherCard) {
        const sortedValues = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        // Je gèrerai la transformation du 1 en A (pour l'as) autre part
        return (sortedValues.indexOf(this.value) === sortedValues.indexOf(otherCard.value)+1); 
    }
}
let exampleCard = new Card("1", "♠︎");
let otherExampleCard = new Card("1","♡");
// console.log(exampleCard);
// exampleCard.display();
// console.log("isSuite :", exampleCard.isSuiteOf(otherExampleCard));
// console.log("hasSameColor :", exampleCard.hasSameColorAs(otherExampleCard));
// exampleCard.setOneToAce();
// exampleCard.display();
// console.log("isAce :", exampleCard.isAce());

// Je crée une classe pour gérer les ensembles de cartes
class HandOfCards {
    constructor(arrayOfCards) {
        this.hand = arrayOfCards;
    }

    toString() {
        return ((this.hand.map(card => card.toString())).join(" "))
    }

    display() {
        console.log(this.toString());
    }

    getNumberOfCards() {
        return this.hand.length;
    }

    shuffle() { // modifie le paquet de cartes
        this.hand = shuffle(this.hand)
    }

    hasAce() {
        for (let i=0; i<this.getNumberOfCards(); i++) {
            if (this.hand[i].isAce()) {
                return true;
            }
        }
        return false;
    }

    setOnesToAces() { // modifie le paquet de cartes
        this.hand = this.hand.map(card => card.setOneToAce());
    }

    setAcesToOnes() { // modifie le paquet de cartes
        this.hand = this.hand.map(card => card.setAceToOne());
    }

    gettHighestCardIndex() {
        let index = 0;
        let highestCard = this.hand[0];
        for (let i=1; i<this.getNumberOfCards(); i++) {
            let currentCard = this.hand[i];
            if (currentCard.hasHigherValueAs(highestCard)) {
                index = i;
                highestCard = currentCard;
            }
        }
        return index;
    }

    extractHighestCard() { // modifie le paquet de cartes
        return this.hand.splice(this.gettHighestCardIndex(), 1);
    }

    // Range le deck en valeurs croissantes
    sortByValue() { // modifie le paquet de cartes
        let sortedHand = [];
        while (this.getNumberOfCards() > 0) {
            sortedHand.push(this.extractHighestCard());
        }
        this.hand = sortedHand;
    }
}

// Je reecris une fonction pour créer un objet HandOfCards "deck" avec des objets Card
function createDeckCards() {
    let array = [];
    ["♠︎","♣︎","♡","♢"].forEach(symbol => {
        for (let i=1; i<=10; i++) {
            array.push(new Card(`${i}`, symbol));
        }
        ["J","Q","K"].forEach(head => {
            array.push(new Card(head, symbol));
        })
    })
    let deck = new HandOfCards(array);
    deck.shuffle();
    return deck;
}

let exampleDeck = createDeckCards();
exampleDeck.display();
exampleDeck.setOnesToAces();
exampleDeck.display();

// // Un tour :
// let deck = createDeckCards();
// // console.log(deck);
// const player1 = deal(2);
// const player2 = deal(2);
// // console.log("players hand", player1, player2);
// let flopCards = flop();
// // console.log("cards on the board", flopCards);

// ETAPE 5 : 
// Fonction qui retourne une string decrivant la main d'un joueur ou le board ou le deck
function handToString(hand) {
    let string = hand.reduce((acc, card) => {
        return acc + " " + card.toString();
    });
    return string;
}
// console.log(handToString(player1));

// Fonction pour trier les cartes par ordre de valeurs croissantes
function sortCardsByValue(cards) {

} 

// Fonction pour savoir si c'est une suite
function isSuite(cards) {
    // je définis une correspondance numérique des valeurs cartes
    const valueCorrespondance = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "J": 11,
        "Q": 12,
        "K": 13
    }
    let sortedCards = [];
    let sortedValues = [];

    // je trie les cartes par valeur croissante et s'il y a un doublon je renvoie false
    cards.forEach(card => {
        let numValue = valueCorrespondance[card.value];
        if (sortedCards.length == 0){
            sortedCards.push(card);
            // je stocke les valeurs numeriques dans un tableau pour placer plus facilement les cartes dans l'ordre
            sortedValues.push(numValue);
        } else {
            // je m'alerte sur le fait qu'il y a des cartes de la meme valeur
            if (sortedValues.includes(numValue)) {
                console.log(`Au moins 2 cartes de meme valeur : ${card.value}`);
            }
            // je place la carte et la valeur numerique au bon endroit dans les tableaux respectifs (valeur croissante avec 1 en plus petit)
            for (let i=0; i<sortedValues.length; i++) {
                if (numValue < sortedValues[i]) {
                    sortedCards.splice(i, 0, card);
                    sortedValues.splice(i, 0, numValue);
                    break; // pas besoin de continuer a parcourir le tableau
                }

                if (i == sortedCards.length-1) { //on est arrive au bout du tableau trie, j'ajoute la carte a la fin
                    sortedCards.push(card);
                    sortedValues.push(numValue);
                }
            }  
        }
    });
    console.log(`Les cartes triees en ordre croissant : ${handToString(sortedCards)}`);

    // je vérifie si 5 cartes triées forment une suite grace au tableau des valeurs numériques
    // La carte de l'as peut se mettre en debut de suite (avant un 2) ou en fin de suite (après un roi).
    // je crée un tableau dans lequel je mets les cartes qui se suivent s'il y en a bien 5
    let suite = [sortedCards[0]];
    for (let i=0; i<sortedValues-1; i++) {
        if (sortedValues[i+1] == sortedValues[i]) {
            // rien ne se passe
        } else if (sortedValues[i+1] == sortedValues[i]+1) { // la suite se poursuit quand les cartes se suivent
            suite.push(sortedCards[i+1]);
        } else if (sortedValues.length - i > 5) { // sinon, tant qu'il reste 5 cartes à vérifier on peut recommencer la suite
            suite = sortedCards[i];
        } else { // sinon il n'y a pas de suite de 5 cartes
            suite = [];
            break;
        }
    }
    // Si l'as était au début, je retente en le mettant à la fin
    if (sortedValues[0])


    return isSuite;
    
}

// Fonction pour annoncer la main du joueur (paire, brelan, carre, couleur, suite, quinte) 
function showdown(playerHand, flop) {
    console.log(`flop: ${handToString(flop)} / player: ${handToString(playerHand)}`);
    let allCards = playerHand.concat(flop);
    isSuite(allCards);
}
// showdown(player1, flopCards);