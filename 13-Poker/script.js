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
    ["♠︎", "♣︎","♡", "♢"].forEach(symbol => {
        for (let i=1; i<=10; i++) {
            deck.push(i+symbol);
        }
        ["J", "Q", "K"].forEach(head => {
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

let deck = createDeck();
// console.log("deck", deck)
const player1 = deal(2);
const player2 = deal(2);
// console.log("players hand", player1, player2)

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

let cards = flop();
// console.log("cards on the board", cards);
