// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/12_calculatrice_graphique_%F0%9F%A7%AE.md
const displayedElement = document.getElementById("display");
const resultElement = document.getElementById("result");

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
    let result = calculate(displayedText);
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

// Fonction pour réécrire les nombres négatifs (-x en !x) dans une chaîne de caractère représentant une opération
function transformNegativeNumbers(str) {
    let newStrArray = str.split("");
    let indexOfMinus = indexesOfChar("-", str);
    indexOfMinus.forEach(function(index) {
        // Si le "-" est précédé d'un opérateur c'est que le nombre est négatif(-x), je le réécris (!x) pour faciliter 
        // l'ordre des opérations dans la fonction suivante "handleSimpleCalculation"
        if (index == 0 || ["+","-","*","/"].includes(str[index-1])) {
            newStrArray[index] = "!"
        }
    })

    return newStrArray.join("");
}

// Fonction pour calculer le résultat d'une ligne d'opération (sous forme d'une string) qui ne contient pas de parenthèses
function handleSimpleCalculation(str) {
    // Si la str ne contient pas d'opérateurs, c'est juste un nombre qu'on convertit en float
    if (!(str.includes("/") || str.includes("*") || str.includes("-") || str.includes("+"))) {
        // Les nombres négatifs ont été réécrits (-x en !x), je les retransforme (!x -> -x)
        if (str.includes("!")) {
            str = "-" + str.slice(1);
        } 
        return parseFloat(str);
    }
    // Sinon, je gère toutes les opérations de façon récursive en partitionnant le calcul grâce aux opérateurs
    // dans un ordre particulier pour gérer les priorités dans les calculs

    // Avant cela je réécris les nombres négatifs (-x -> !x) pour ne pas les confondre avec une soustraction
    str = transformNegativeNumbers(str);

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

// Fonction pour calculer le résultat d'une ligne d'opération avec parenthèses
function calculate(str) {
    // Si la string ne contient pas de parenthèses, on gère le calcul avec la fonction précédente
    if (!str.includes("(")) {
        return handleSimpleCalculation(str);
    }
    // Sinon le but est de faire les calculs entre parenthèses d'abord et dans le bon ordre
    // Le premier calcul à effectuer sera entre la première ")" et la "(" précédant celle-ci
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
// let exStr = "(5*((5+8)-3*(2+5)))*5"
// let exStr2 = "(5*-8)*5"
// console.log(calculate(exStr));


