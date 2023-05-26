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

// Il faut une fonction qui est appelée en appuyant sur égal pour faire le calcul
function calculate() {
    let displayedText = displayedElement.innerText;
    let termsOfAddition = displayedText.split("+");
    // je cherche le nombre max de décimales dans les termes de l'opération pour afficher le résultat avec le bon nombre de chiffres
    let maxNumberDecimals = 0;
    termsOfAddition.forEach(e => {
        if (e.includes(".")) {
            let numberDecimals = e.split(".")[1].length;
            if (numberDecimals > maxNumberDecimals) {
                maxNumberDecimals = numberDecimals;
            }
        } 
    })
    let floatsOfAddition = termsOfAddition.map(e => parseFloat(e));
    let result = floatsOfAddition.reduce((accumulator, currentValue) => accumulator + currentValue);
    // J'affiche le résultat avec le bon nombre de décimales
    resultElement.innerText = result.toFixed(maxNumberDecimals);
}