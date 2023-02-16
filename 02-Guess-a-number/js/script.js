//Définition de variables pour accéder plus facilement aux éléments de la page HTML
const playButton = document.getElementById('player1Entry');
const guessForm = document.getElementById('guessForm');
const player2Guess = document.getElementById('player2Guess');
let gameText = document.getElementById('gameText');
let tryText = document.getElementById('tryText');

let bornInf;
let bornSup;
let textBornInf = document.getElementById('textBornInf');
let textBornSup = document.getElementById('textBornSup');

//Déclaration de variables pour le jeu
let player1Number;
let nbTry = 0;

function numberToGuess() { //Demande au joueur 1 un nombre + vérification que c'est bien un nombre
    let isValid = false;
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
    console.log("Après l'entrée du joueur1, player1Number = "+player1Number);
    return player1Number;
}

function didIWin() {
    const numberToGuess = player1Number;
    console.log("Essai du joueur, le nombre à deviner est : "+player1Number);
    console.log("Variable interne de la fonction : "+numberToGuess);
    const givenNumber = parseInt(player2Guess.value);
    console.log("Le joueur2 tente le nombre : "+givenNumber);

    nbTry++;
    bornInf = parseInt(player2Guess.getAttribute("min"));
    bornSup = parseInt(player2Guess.getAttribute("max"));
    console.log(bornInf, bornSup);

    let didIWin = false;

    gameText.innerHTML += "Le joueur 2 a tenté : "+givenNumber+"<br>";

    if (givenNumber < numberToGuess){
        gameText.innerHTML += "Le nombre à trouver est plus grand ↗️<br>"
        if(bornInf < givenNumber){
            textBornInf.innerHTML = ""+givenNumber+" < ";
            player2Guess.setAttribute("min",givenNumber+1);
        }
        //alert("Plus grand");
    } else if (givenNumber > numberToGuess){
        gameText.innerHTML += "Le nombre à trouver est plus petit ↘️<br>"
        if(bornSup > givenNumber){
            textBornSup.innerHTML = "< "+givenNumber;
            player2Guess.setAttribute("max",givenNumber-1);
        }
        //alert("Plus petit");
    } else if (givenNumber == numberToGuess){
        didIWin = true;
        guessForm.style.visibility = "hidden";
        gameText.innerHTML += "BRAVO ! Vous avez bien deviné 🕵️‍♀️🥳"
        alert("Bravo ! Vous avez deviné le nombre ");
    } else {
        alert("Il y a une erreur. Le nombre à deviner n'est pas défini ?")
    }

    tryText.innerHTML = "Nombre de tentatives du joueur 2 : <strong>"+nbTry+"</strong>" ;
    console.log("ETAPE", player2Guess.getAttribute("min"), player2Guess.getAttribute("max"));

    return didIWin;
}

function initializeGame() {
    guessForm.style.visibility = "hidden";
    textBornInf.innerHTML = "0 &le;";
    textBornSup.innerHTML = "&le; 50";
    player2Guess.setAttribute("min", 0);
    player2Guess.setAttribute("max", 50);
    player2Guess.value = "";
    gameText.innerHTML = "";
    tryText.innerHTML = "";
    nbTry = 0;
}

playButton.addEventListener('click', function launchPlay() {    
    initializeGame();

    player1Number = numberToGuess();
    console.log("Le nombre à deviner est : "+player1Number);
    playButton.textContent = "Recommencer le jeu";
    guessForm.style.visibility = "visible";
    gameText.innerHTML = "<strong>Déroulé de la partie</strong><br> Début de la partie<br>";   
});