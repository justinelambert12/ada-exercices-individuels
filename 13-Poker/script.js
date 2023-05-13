// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/13_poker.md

// IMPLEMENTATION EN POO A PARTIR DE L'ETAPE 4 PLUS BAS. SEULE LA FONCTION "shuffle" EST UTILISEE
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
// ====================================================================================================================================
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
// TESTS POUR LES 2 PREMIERES ETAPES
// -----------------------------------------------
// Un tour :
// let deck = createDeck();
// // console.log("deck", deck)
// const player1 = deal(2);
// const player2 = deal(2);
// // console.log("players hand", player1, player2)
// let cards = flop();
// // console.log("cards on the board", cards);
// -----------------------------------------------

// ====================================================================================================================================

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

    setOneToAce() { // peut modifier la carte
        if (this.value === "1") {
            this.value = "A";
        }
    }

    setAceToOne() { // peut modifier la carte
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
// -----------------------------------------------
// TESTS POUR LES METHODES DES OBJETS Card
// let exampleCard = new Card("1", "♠︎");
// let otherExampleCard = new Card("1","♡");
// console.log(exampleCard);
// exampleCard.display();
// console.log("isSuite :", exampleCard.isSuiteOf(otherExampleCard));
// console.log("hasSameColor :", exampleCard.hasSameColorAs(otherExampleCard));
// exampleCard.setOneToAce();
// exampleCard.display();
// console.log("isAce :", exampleCard.isAce());
// -----------------------------------------------

// Je crée une classe pour gérer les ensembles de cartes
class HandOfCards {
    constructor(arrayOfCards) {
        if (!arrayOfCards) {
            this.hand = [];
        } else {
            this.hand = arrayOfCards;
        }
    }

    toString() {
        return (this.hand.map(card => card.toString()).join(" "))
    }

    display() {
        console.log(this.toString());
    }

    getNumberOfCards() {
        return this.hand.length;
    }

    addCard(card) { // modifie le paquet de cartes
        this.hand.push(card);
    }

    drawCard() { // modifie le paquet de cartes
        return this.hand.shift();
    }

    addHand(otherHand) { // modifie le paquet de cartes
        this.hand = this.hand.concat(otherHand.hand);
    }

    concatHands(otherHand) { 
        return new HandOfCards(this.hand.concat(otherHand.hand));
    }

    // METHODES IMPLEMENTEES PRECEDEMMENT POUR DISTRIBUER
    shuffle() { // modifie le paquet de cartes
        this.hand = shuffle(this.hand)
    }

    createDeck() { // à utiliser avec HandOfCards.prototype.createDeck()
        let deck = new HandOfCards();
        ["♠︎","♣︎","♡","♢"].forEach(symbol => {
            for (let i=1; i<=10; i++) {
                deck.addCard(new Card(`${i}`, symbol));
            }
            ["J","Q","K"].forEach(head => {
                deck.addCard(new Card(head, symbol));
            })
        })
        deck.shuffle();
        return deck;
    }

    deal(numberOfCards) { // modifie le paquet de cartes
        let dealHand = new HandOfCards();
        if (numberOfCards < this.getNumberOfCards()) {
            for (let i=0; i<numberOfCards; i++){
                // Retire la premiere carte du paquet et la met dans la main du deal
                dealHand.addCard(this.drawCard());
            }
        } else {
            console.log(`Pas assez de cartes dans le paquet pour en tirer ${numberOfCards} (${this.getNumberOfCards()} restante(s)).`)
        }
        return dealHand;
    }

    flop() { // modifie le paquet de cartes
        let flopCards = new HandOfCards();
        if (this.getNumberOfCards() >= 8) {
            // 1er tour : 1 carte brulee et 3 cartes sorties
            this.deal(1);
            flopCards.addHand(this.deal(3));
            // 2e tour : 1 carte brulee et 1 carte sortie
            this.deal(1);
            flopCards.addHand(this.deal(1));
            // 3e tour : 1 carte brulee et 1 carte sortie
            this.deal(1);
            flopCards.addHand(this.deal(1));
        } else {
            console.log(`Pas assez de cartes pour le flop (${this.getNumberOfCards()} carte(s) restante(s)).`)
        }

        return flopCards;
    }

    // NOUVELLES METHODES POUR DETERMINER LES COMBINAISONS
    hasAce() {
        for (let i=0; i<this.getNumberOfCards(); i++) {
            if (this.hand[i].isAce()) {
                return true;
            }
        }
        return false;
    }

    setOnesToAces() { // modifie le paquet de cartes
        this.hand = this.hand.map(function(card) {
            card.setOneToAce();
            return card;
        });
    }

    setAcesToOnes() { // modifie le paquet de cartes
        this.hand = this.hand.map(function(card) {
            card.setAceToOne();
            return card;
        });
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
        return (this.hand.splice(this.gettHighestCardIndex(), 1).shift());
        //"splice(...)" renvoie un tableau contenant une Card, je renvoie la Card simplement
    }

    // Range le deck en valeurs croissantes
    sortByValue() { // modifie le paquet de cartes
        let sortedHand = [];
        // je sors les cartes les plus élevées du deck et je les mets au début du nouveau deck une à une
        while (this.getNumberOfCards() > 0) {
            sortedHand.unshift(this.extractHighestCard());
        }
        this.hand = sortedHand;
    }
}
// -----------------------------------------------
// TESTS POUR LES METHODES DES OBJETS HandOfCards
// let emptyDeck = new HandOfCards();
// console.log(emptyDeck);
// let exampleDeck = HandOfCards.prototype.createDeck();
// exampleDeck.display();
// exampleDeck.sortByValue();
// exampleDeck.display();
// exampleDeck.setOnesToAces();
// exampleDeck.display();
// exampleDeck.sortByValue();
// exampleDeck.display();

// TESTS DE L'ETAPE 4
// // Un tour :
// const deck = HandOfCards.prototype.createDeck();
// console.log("deck shuffled: ", `${deck.toString()}`);
// const player1 = deck.deal(2);
// const player2 = deck.deal(2);
// console.log("players hand: ", `P1: ${player1.toString()}`, `\\ P2: ${player2.toString()}`);
// const flopCards = deck.flop();
// console.log("cards on the board: ", `${flopCards.toString()}`);
// -----------------------------------------------

// ETAPE 5 : Afficher la plus haute combinaison que le joueur peut faire

// Fonction pour annoncer la main du joueur (paire, brelan, carre, couleur, suite, quinte) 
function showdown(playerHand, flop) {
    console.log(`flop: ${flop.toString()} / player: ${playerHand.toString()}`);
    let allCards = playerHand.concat(flop);
    
}
// -----------------------------------------------
// TESTS DE L'ETAPE 5
// // Un tour :
// const deck = HandOfCards.prototype.createDeck();
// const player1 = deck.deal(2);
// const player2 = deck.deal(2);
// console.log("players hand: ", `P1: ${player1.toString()}`, `\\ P2: ${player2.toString()}`);
// const flopCards = deck.flop();
// console.log("cards on the board: ", `${flopCards.toString()}`);
// showdown(player1, flopCards);
// -----------------------------------------------