function numberToGuess() {
    let isValid = false;
    let player1Number;
    while (!isValid) {
        let response = prompt("Joueur 1 : Choisissez un nombre compris entre 0 et 50.");
        player1Number = parseInt(response);
        if (isNaN(player1Number)){
            alert(`"${response}" n'est pas un nombre !`);
        } else if (player1Number<0 || player1Number>50){
            alert(`"${response}" n'est pas compris entre 0 et 50.`)
        } else {
            isValid = true;
        }
    }
    return player1Number;
}

function askNumber() {
    let isNumber = false;
    let givenNumber;
    while (!isNumber){
        let response = prompt("Devinez le nombre auquel je pense.");
        givenNumber = parseInt(response);
        if(isNaN(givenNumber)){
            alert(`"${response}" n'est pas un nombre. Recommencez.`);
        } else {
            isNumber = true;
        }
    }
    return givenNumber;
}

function didIWin(numberToGuess, givenNumber) {
    console.log("Le nombre en argument est : "+givenNumber);
    let didIWin = false;
    if (givenNumber < numberToGuess){
        alert("Plus grand");
    } else if (givenNumber > numberToGuess){
        alert("Plus petit");
    } else {
        didIWin = true;
        alert("Bravo ! Vous avez deviné le nombre");
    }

    return didIWin;
}

function gamePlay() {
    let endOfGame = false;
    let player1Number = numberToGuess();
    do {
        let givenNumber = askNumber();
        endOfGame = didIWin(player1Number, givenNumber);
    } while (!endOfGame);
}

gamePlay();