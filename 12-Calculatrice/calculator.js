// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/12_calculatrice_graphique_%F0%9F%A7%AE.md
// const displayedElement = document.getElementById("display");
// const resultElement = document.getElementById("result");

function addToDisplay() {
    let displayedText = displayedElement.innerText;
    // Si l'affichage à un "=" c'est que le précédent calcul est fini.
    if (displayedText.includes("=")) {
        // Si on appuie sur une touche avec opérateur, il faut reprendre le résultat précédent
        if ([".", "+", "-", "*", "/"].includes(event.target.value)) {
            displayedText = resultElement.innerText;
            clearDisplays();
        // Sinon on remet à 0 les affichages avant d'afficher le nouveau chiffre
        } else {
            clearDisplays();
            displayedText = displayedElement.innerText;
        }
    } 
    // Si l'affichage est à "0" et qu'on appuie sur une touche avec un chiffre, la valeur apparaît sans le "0", donc je vide "displayedText"
    if (displayedText == "0" && !([".", "+", "-", "*", "/"].includes(event.target.value))) {
        displayedText = "";
    }
    // il faut gérer de ne pas pouvoir mettre plusieurs points (séparation décimales) à la suite
    displayedElement.innerText = displayedText + event.target.value;
}

// Fonction appelée en cliquant sur le bouton "=" pour calculer le résultat et l'afficher
function displayResult() {
    let displayedText = displayedElement.innerText;
    // je ne gère pas encore le nombre max de décimales 
    // let maxNumberDecimals = 2;
    // J'affiche le résultat avec le bon nombre de décimales
    // resultElement.innerText = result.toFixed(maxNumberDecimals);
    let result = handleSimpleCalculation(displayedText);
    resultElement.innerText = result;
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

// GERE MAL LES NOMBRES NEGATIFS -> A CORRIGER
// Fonction pour calculer le résultat d'une ligne d'opération (sous forme d'une string) qui ne contient pas de parenthèses
function handleSimpleCalculation(str) {
    // Si la str ne contient pas d'opérateurs, c'est juste un nombre qu'on convertit en float
    if (!(str.includes("/") || str.includes("*") || str.includes("-") || str.includes("+"))) {
        return parseFloat(str);
    }
    // Sinon, on gère toutes les opérations de façon récursive en partitionnant le calcul grâce aux opérateurs
    // dans un ordre particulier pour gérer les priorités dans les calculs
    if (str.includes("+")) {
        return str.split("+").map(e => handleSimpleCalculation(e)).reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    if (str.includes("-")) {
        return str.split("-").map(e => handleSimpleCalculation(e)).reduce((accumulator, currentValue) => accumulator - currentValue);
    }
    if (str.includes("*")) {
        return str.split("*").map(e => handleSimpleCalculation(e)).reduce((accumulator, currentValue) => accumulator * currentValue);
    }
    if (str.includes("/")) {
        return str.split("/").map(e => handleSimpleCalculation(e)).reduce((accumulator, currentValue) => accumulator / currentValue);
    }
    
}

// Fonction qui retourne un tableau de tous les index de position d'un caractère dans une chaîne de caractère
function indexesOfChar(char, str) {
    if (!str.includes(char)) {
        return [];
    }

    let arrayOfIndexes = [];
    let currentIndex = 0;
    do {
        let indexOfOccurence = str.indexOf(char, currentIndex);
        arrayOfIndexes.push(indexOfOccurence);
        currentIndex = indexOfOccurence + 1;
    } while (str.indexOf(char, currentIndex) != -1);
    
    return arrayOfIndexes;
}

// Fonction pour calculer le résultat d'une ligne d'opération avec parenthèses
function calculate(str) {
    // Si la string ne contient pas de parenthèses, on gère le calcul avec la fonction précédente
    if (!str.includes("(")) {
        return handleSimpleCalculation(str);
    }
    // Sinon le but est de faire les calculs entre parenthèses d'abord et dans le bon ordre
    // Le premier calcul à effectuer sera entre la première ")" et la "(" précédente celle-ci
    // Je détermine leurs index
    let indexOfClosingParenthesis = str.indexOf(")");
    let indexofOpeningParenthesis = indexesOfChar("(", str).filter(i => i < indexOfClosingParenthesis).pop();
    // Je calcule le bloc entre les parenthèses et je le réintègre dans la chaine de caractères
    let strBefore = str.slice(0, indexofOpeningParenthesis);
    let strAfter = str.slice(indexOfClosingParenthesis+1);
    let strToCalculate = str.slice(indexofOpeningParenthesis+1, indexOfClosingParenthesis);
    let strNew = strBefore+handleSimpleCalculation(strToCalculate)+strAfter; 

    return calculate(strNew);
}
let exStr = "(5*((5+8)-3*(2+5)))*5"
let exStr2 = "(5*-8)*5"
// console.log(calculate(exStr2));
console.log(handleSimpleCalculation('3*-2'))
// console.log(indexesOfChar("(", exStr))
// console.log(indexesOfChar(")", exStr))
