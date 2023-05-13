// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/13_poker.md

// POO

// ETAPE 4 : approche orientee objet, introduction des cartes en classe
class Card {
    constructor(value, color) {
        const availableValues = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        const correspondanceColors = {
            "♠︎": ["♠︎", "spade", "s"],
            "♣︎": ["♣︎", "clover", "c"],
            "♡": ["♡", "heart", "h"],
            "♢": ["♢", "diamond", "d"]
        }
        const availableColorsNames = Object.values(correspondanceColors).join().split(",");
        if (availableValues.includes(value) 
        && availableColorsNames.includes(color)) {
            let colorSymbol = Object.keys(correspondanceColors).find(key => correspondanceColors[key].includes(color))
            this.value = value;
            this.color = colorSymbol;
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
        } else if (!Array.isArray(arrayOfCards)) {
            console.log(`"${arrayOfCards}" n'est pas un tableau`)
            this.hand = [];
        } else {
            // important d'associer une copie du tableau et non le tableau lui-même,
            // sinon en modifiant le tableau, on modifie le deck aussi
            this.hand = [...arrayOfCards];
        }
    }

    // METHODES MANIPULANT DIRECTEMENT LES PROPRIETES DE HandOfCards (this.hand)
    toString() {
        return (this.hand.map(card => card.toString()).join(" "))
    }

    getHand() {
        return [...this.hand];
    }

    getNumberOfCards() {
        return this.hand.length;
    }

    addCard(card, index) { // modifie le paquet de cartes
        // si l'index n'est pas renseigné ou invalide, on met la carte à la fin du paquet
        if (!index || !(index < this.getNumberOfCards() && index >= 0)) {
            this.hand.push(card);
        } else { // si l'index est valide, on insère la carte au bon endroit
            this.hand.splice(index, 0, card)
        }
    }

    extractCardAtIndex(index) { // modifie le paquet de cartes
        if (index < this.getNumberOfCards() && index >= 0) {
            return (this.hand.splice(index, 1).shift());
            //"splice(...)" renvoie un tableau contenant une Card, je renvoie la Card simplement
        } else {
            console.log(`Impossible d'extraire une carte de ${this.display()} à l'index ${index} !`);
        }
    }

    addHand(otherHand) { // modifie le paquet de cartes
        this.hand = this.getHand().concat(otherHand.getHand());
    }

    setOnesToAces() { // modifie le paquet de cartes
        let newHand = this.getHand().map(function(card) {
            card.setOneToAce();
            // console.log("setOneToAce after", card);
            return card;
        });
        // console.log("hand after setOneToAce", newHand)
        // console.log("isArray", Array.isArray(newHand))
        this.hand = newHand;
    }

    setAcesToOnes() { // modifie le paquet de cartes
        this.hand = this.hand.map(function(card) {
            card.setAceToOne();
            return card;
        });
    }

    // METHODES DE MANIPULATIONS SIMPLES DES OBJETS HandOfCards

    display() {
        console.log(this.toString());
    }

    getCardAtIndex(index) {
        if (index < this.getNumberOfCards() && index >=0) {
            return this.getHand()[index];
        } else {
            console.log(`Index "${index}" invalide pour l'objet : ${this}`)
        }
    }

    // Tire la première carte du paquet
    drawCard() { // modifie le paquet de cartes
        return this.extractCardAtIndex(0);
    }

    // Renvoie un nouveau deck composé des deux decks
    concatHands(otherHand) { 
        return new HandOfCards(this.getHand().concat(otherHand.getHand()));
    }

    // METHODES POUR DISTRIBUER
    shuffle() { // modifie le paquet de cartes
        let shuffledHand = new HandOfCards();
        while (this.getNumberOfCards() > 0) {
            let randomIndex = Math.floor(Math.random() * this.getNumberOfCards())
            // J'extrais une carte au hasard de mon deck que je vide au fur et à mesure
            let randomCard = this.extractCardAtIndex(randomIndex);
            // Je la mets dans un deck temporaire
            shuffledHand.addCard(randomCard);
        }
        // je fusionne mon deck vide avec le deck temporaire
        this.addHand(shuffledHand);
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

    // METHODES POUR DETERMINER LES COMBINAISONS
    hasAce() {
        if (this.getNumberOfCards() > 0) {
            for (let i=0; i<this.getNumberOfCards(); i++) {
                if (this.getCardAtIndex(i).isAce()) {
                    return true;
                }
            }
        }
        return false;
    }

    getLastCard() {
        return this.getCardAtIndex(this.getNumberOfCards-1);
    }

    getHighestCardIndex() {
        let index = 0;
        let highestCard = this.getCardAtIndex(0);
        for (let i=1; i<this.getNumberOfCards(); i++) {
            let currentCard = this.getCardAtIndex(i);
            if (currentCard.hasHigherValueAs(highestCard)) {
                index = i;
                highestCard = currentCard;
            }
        }
        return index;
    }

    getHighestCard() {
        return this.getCardAtIndex(this.getHighestCardIndex());
    }

    extractHighestCard() { // modifie le paquet de cartes
        return this.extractCardAtIndex(this.getHighestCardIndex());
    }

    // Range le deck en valeurs croissantes
    sortByValue() { // modifie le paquet de cartes
        let sortedHand = new HandOfCards();
        // je sors les cartes les plus élevées du deck et je les mets au début du nouveau deck une à une
        while (this.getNumberOfCards() > 0) {
            sortedHand.addCard(this.extractHighestCard(), 0);
        }
        // je fusionne mon deck vide avec le deck trié
        this.addHand(sortedHand);
    }

    // Retourne un nouveau deck rangé en valeurs croissantes à partir du deck actuel
    getSortedByValue() {
        let newHand = new HandOfCards(this.getHand());
        newHand.sortByValue();
        return newHand;
    }

    // Retourne la suite de longueur imposée avec la plus haute valeur de carte (si elle existe, sinon HandOfCards vide)
    getSuite(suiteLength) {
        let arrayOfSuites = [];
        let strongestSuite = new HandOfCards();
        if (this.getNumberOfCards() >= suiteLength) {
            let sortedHand = this.getSortedByValue();
            // je mets la première carte de la main triée dans la suite que je constitue
            let currentSuite = new HandOfCards(sortedHand.drawCard());
            sortedHand.forEach((card, index) => {
                // Si la carte ne complète pas la suite, je mets la suite actuelle dans le tableau si elle est de bonne taille
                // et je commence une nouvelle suite avec la carte actuelle
                if (!card.isSuiteOf(currentSuite.getLastCard())){
                    if (currentSuite.getNumberOfCards() === suiteLength) {
                        arrayOfSuites.push(currentSuite);
                    }
                    currentSuite = new HandOfCards()
                } else if (currentSuite.getNumberOfCards() === suiteLength) {
                    // la suite contient déjà le bon nombre de cartes, on enlève la première de plus petite valeur
                    // pour pouvoir ajouter la suivante
                    currentSuite.drawCard();
                }
                currentSuite.addCard(card);

                //si c'est la dernière carte, je fais les vérifications et m'occupe de cette dernière suite
                if (index === sortedHand.getNumberOfCards()-1) {
                    if (currentSuite.getNumberOfCards() === suiteLength) {
                        arrayOfSuites.push(currentSuite);
                    }
                }
            });
        }

        // Je parcours la liste des suites valides (longueur = longueur imposée) s'il y en a
        if (arrayOfSuites.length > 0) {
            arrayOfSuites.forEach(currentSuite => {
                // je sélectionne la suite avec la carte de plus haute valeur
                if (currentSuite.getHighestCard().hasHigherValueAs(strongestSuite.getHighestCard())) {
                    strongestSuite = currentSuite;
                }
            })
        }

        return strongestSuite;
    }

    // Retourne la suite de taille imposée avec la plus haute valeur de carte en prenant en compte les deux valeurs de l'as
    getHighestSuite(suiteLength) {
        // S'il y a un as je retourne la suite de taille imposée qui le place après le roi (suite la plus forte)
        // seulement si elle existe.
        // console.log("this.getHand()", this.getHand());
        // console.log("this.hand", this.hand);
        if (this.hasAce()) {
            console.log("avant creation du deckWithAces OK");
            let deckWithAces = new HandOfCards(this.getHand());
            console.log("deckwithAces before setOnesToAces", deckWithAces)
            deckWithAces.setOnesToAces();
            let highestSuiteWithAce = deckWithAces.getSuite(suiteLength);
            
            if (highestSuiteWithAce.getNumberOfCards() > 0) {
                return highestSuiteWithAce;
            }
        }
        // Sinon je renvoie la suite de taille imposée si elle existe
        return this.getSuite(suiteLength);
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
let exArrCards = [new Card("1", "s"), new Card("K", "h"), new Card("Q", "c"), new Card("J", "d")];
let exDeckCards = new HandOfCards(exArrCards);
// exDeckCards.display();
// console.log("exDeckCards", exDeckCards);
console.log("getHighestSuite", exDeckCards.getSuite(3));
console.log("getHighestSuite", exDeckCards.getHighestSuite(4));
// exArrCards.shift();
// exDeckCards.display();
// exDeckCards.shuffle();
// exDeckCards.display();

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