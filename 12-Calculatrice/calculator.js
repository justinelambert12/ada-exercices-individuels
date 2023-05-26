// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/12_calculatrice_graphique_%F0%9F%A7%AE.md
const displayedElement = document.getElementById("display");
const resultElement = document.getElementById("result");

function addToDisplay() {
    let displayedText = displayedElement.innerText;
    // Si l'affichage est à "0" et qu'on appuie sur une touche avec un chiffre, la valeur apparaît sans le "0", donc je vide "displayedText"
    if (displayedText == "0" && !([".", "+", "-", "*", "/"].includes(event.target.value))) {
        displayedText = "";
    }
    // il faut gérer de ne pas pouvoir mettre plusieurs points (séparation décimales) à la suite
    displayedElement.innerText = displayedText + event.target.value;
}

// Fonction appelée en cliquant sur le bouton "=" pour calculer le résultat et l'afficher
function calculate() {
    let displayedText = displayedElement.innerText;
    let termsOfAddition = displayedText.split("+");
    // je cherche le nombre max de décimales dans les termes de l'opération pour afficher le résultat avec le bon nombre de chiffres
    let maxNumberDecimals = getNumberMaxDecimals(termsOfAddition);
    let floatsOfAddition = termsOfAddition.map(e => parseFloat(e));
    let result = floatsOfAddition.reduce((accumulator, currentValue) => accumulator + currentValue);
    // J'affiche le résultat avec le bon nombre de décimales
    resultElement.innerText = result.toFixed(maxNumberDecimals);
}

// Fonction pour remettre à 0 les affichages
function clearDisplays() {
    displayedElement.innerText = "0";
    resultElement.innerText = "0";
}

// Fonction pour retourner le nombre de décimales max dans un tableau contenant des nombres sous forme de string 
function getNumberMaxDecimals(arrayOfStringifiedNumbers) {
    let maxNumberDecimals = 0;
    arrayOfStringifiedNumbers.forEach(e => {
        if (e.includes(".")) {
            let numberDecimals = e.split(".")[1].length;
            if (numberDecimals > maxNumberDecimals) {
                maxNumberDecimals = numberDecimals;
            }
        } 
    })
    return maxNumberDecimals;    
}