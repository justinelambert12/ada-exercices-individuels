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
        if (arrayOfCards === undefined) {
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
        if (index === undefined || !(index < this.getNumberOfCards() && index >= 0)) {
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

    // Renvoie un nouveau deck où sont extraites du deck les cartes communes avec le deck en paramètre
    extractHand(otherHand) {
        let handOfCards = new HandOfCards();
        this.getHand().forEach((cardA) => {
            let isInOtherHand = false;
            otherHand.getHand().forEach(cardB => {
                if (cardA.hasSameValueAs(cardB) && cardA.hasSameColorAs(cardB)) {
                    isInOtherHand = true;
                }
            })
            if (!isInOtherHand) {
                handOfCards.addCard(cardA);
            }
        })

        return handOfCards;
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

    hasOneColor() {
        // Si une seule carte ou pas de carte dans la main il n'y a qu'une seule couleur
        if (this.getNumberOfCards() < 2) {
            return true;
        }
        // Je compare les couleurs de toutes les cartes à celle de la première
        for (let i=0; i<this.getNumberOfCards(); i++) {
            if (!(this.getCardAtIndex(i).hasSameColorAs(this.getCardAtIndex(0)))) {
                return false;
            }
        }
        return true;
    }

    getLastCard() {
        return this.getCardAtIndex(this.getNumberOfCards()-1);
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

    // Retourne un nouveau deck rangé en valeurs croissantes à partir du deck actuel
    getSortedByValue() {
        let handSortedByValue = this.getHand().sort(function (cardA, cardB) {
            if (cardB.hasHigherValueAs(cardA)) {
                return -1;
            } else if (cardA.hasHigherValueAs(cardB)) {
                return 1;
            } else {
                return 0;
            }
        });
        return new HandOfCards(handSortedByValue);
    }

    // Retourne la suite (HandOfCards) de longueur imposée avec la plus haute valeur de carte (si elle existe, sinon HandOfCards vide)
    getSuite(suiteLength) {
        let arrayOfSuites = [];
        let strongestSuite = new HandOfCards();
        if (this.getNumberOfCards() >= suiteLength) {
            let sortedHand = this.getSortedByValue();
            let currentSuite = new HandOfCards();
            // je mets la première carte de la main triée dans la suite que je constitue
            currentSuite.addCard(sortedHand.drawCard());
            sortedHand.getHand().forEach((card, index) => {
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

        // S'il y a des suites valides (longueur = longueur imposée) c'est la dernière ajoutée qui a la carte
        // de valeur la plus élevée. Je la fusionne à "strongestSuite" qui était vide.
        if (arrayOfSuites.length > 0) {
            strongestSuite.addHand(arrayOfSuites[arrayOfSuites.length - 1]);
        }

        return strongestSuite;
    }

    // Retourne la suite (HandOfCards) de taille imposée avec la plus haute valeur de carte en prenant en compte les deux valeurs de l'as
    getHighestSuite(suiteLength) {
        // S'il y a un as je retourne la suite de taille imposée qui le place après le roi (suite la plus forte)
        // seulement si elle existe.
        if (this.hasAce()) {
            let deckWithAces = new HandOfCards(this.getHand());
            deckWithAces.setOnesToAces();
            let highestSuiteWithAce = deckWithAces.getSuite(suiteLength);
            
            if (highestSuiteWithAce.getNumberOfCards() > 0) {
                return highestSuiteWithAce;
            }
        }
        // Sinon je renvoie la suite de taille imposée si elle existe
        return this.getSuite(suiteLength);
    }

    // Retourne un objet contenant les ensembles de cartes (clés: pairs, trios, fours / 
    // valeurs: tableaux d'ensembles de valeurs décroissantes)
    getCardsSetsWithSameValue() {
        let cardsSets = {
            "pairs": [], 
            "trios": [], 
            "fours": []
        };
        if (this.getNumberOfCards() > 0) {
            let sortedHand = this.getSortedByValue();
            // Je vais parcourir le deck rangé et séparer les cartes en paires, trois cartes et carrés.
            let currentSet = new HandOfCards();
            currentSet.addCard(sortedHand.drawCard());

            sortedHand.getHand().forEach(card => {
                if (card.hasSameValueAs(currentSet.getLastCard())) {
                    currentSet.addCard(card);
                } else { // la carte n'a pas la même valeur que celles du set actuel
                    // Je mets le set dans l'objet en fonction de son nombre de cartes
                    let numberOfCards = currentSet.getNumberOfCards();
                    if (numberOfCards === 2) {
                        cardsSets["pairs"].push(currentSet);
                    } else if (numberOfCards === 3) {
                        cardsSets["trios"].push(currentSet);
                    } else if (numberOfCards === 4) {
                        cardsSets["fours"].push(currentSet);
                    } else {
                        console.log(`Attention dans getCardsSetsWithSameValue() ${currentSet.display()} n'est pas géré.`)
                    }
                    // Je réinitialise le set et y ajoute la carte
                    currentSet = new HandOfCards()
                    currentSet.addCard(card);
                }
            })
            //Je vérifie le dernier set constitué et le mets dans le tableau ou pas
            let numberOfCards = currentSet.getNumberOfCards();
            if (numberOfCards === 2) {
                cardsSets["pairs"].push(currentSet);
            } else if (numberOfCards === 3) {
                cardsSets["trios"].push(currentSet);
            } else if (numberOfCards === 4) {
                cardsSets["fours"].push(currentSet);
            } else {
                console.log(`Attention dans getCardsSetsWithSameValue() ${currentSet.display()} n'est pas géré.`)
            }
        }

        return cardsSets;
    }
}
// -----------------------------------------------
// TESTS POUR LES METHODES DES OBJETS HandOfCards
// let emptyDeck = new HandOfCards();
// console.log(emptyDeck);
// let exampleDeck = HandOfCards.prototype.createDeck();
// exampleDeck.display();
// exampleDeck.setOnesToAces();
// exampleDeck.display();
// let exArrCards = [new Card("J", "s"), new Card("9", "h"), new Card("Q", "s"), new Card("K", "d"), new Card("10", "h")];
// let exDeckCards = new HandOfCards(exArrCards);
// exDeckCards.display();
// console.log("exDeckCards", exDeckCards);
// console.log("getSuite", exDeckCards.getSuite(3));
// console.log("getHighestSuite", exDeckCards.getHighestSuite(4));
// console.log("hasOneColor", exDeckCards.hasOneColor())
// console.log("getSetsOfCards") 
// let objCardsSets = exDeckCards.getCardsSetsWithSameValue();
// exArrCards.shift();
// exDeckCards.display();
// exDeckCards.shuffle();
// exDeckCards.display();
// let exArrCards2 = [new Card("J", "s"), new Card("5", "h"), new Card("Q", "s"), new Card("K", "d"), new Card("10", "h")];
// let exDeckCards2 = new HandOfCards(exArrCards2);
// console.log("extract Hand", exDeckCards.extractHand(exDeckCards2));

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
    // Je vérifie s'il y a des combinaisons en commençant par les plus fortes
    let highestSuite = allCards.getHighestSuite();

    // Quinte Flush royale (suite de même couleur avec l'As comme carte la plus forte)
    // ou quinte flush (autre suite de même couleur)
    if (highestSuite.getNumberOfCards() > 0 && highestSuite.hasOneColor()) {// il y a une suite et elle est d'une seule couleur
        if (highestSuite.getHighestCard().isAce()) {// la carte la plus forte est un as
            console.log("Player has a royal flush !:", highestSuite.display());
        } else {
            console.log("Player has a straight flush:", highestSuite.display());
        }
        return highestSuite;
    }
    
    let cardsWithSameValue = allCards.getCardsSetsWithSameValue()
    // Carré (4 cartes de même valeur)
    if (cardsWithSameValue[fours].length > 0) { // il y a au moins un carré
        console.log("Player has a four of a kind:", cardsWithSameValue[fours].display());

    } 
    
    // Full (3 cartes de même valeur + une paire)

    
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