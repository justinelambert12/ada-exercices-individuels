// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/12_calculatrice_graphique_%F0%9F%A7%AE.md
const displayedElement = document.getElementById("display");
const resultElement = document.getElementById("result");

// Fonction appelée par tous les boutons chiffres, opérateurs, "=" et "."
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

    displayedElement.innerText = displayedText + event.target.value;
}

// Fonction appelée en cliquant sur le bouton "=" pour calculer le résultat et l'afficher
// Je ne gère pas le nombre maximale de décimales 
function displayResult() {
    let displayedText = displayedElement.innerText;
    let result = calculate(displayedText);
    resultElement.innerText = result;
}

// Fonction pour remettre à 0 les affichages
function clearDisplays() {
    displayedElement.innerText = "0";
    resultElement.innerText = "0";
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
// pour faciliter l'ordre des opérations dans la fonction suivante "handleSimpleCalculation"
function transformNegativeNumbers(str) {
    let newStrArray = str.split("");
    let indexOfMinus = indexesOfChar("-", str);
    indexOfMinus.forEach(function(index) {
        // Si le "-" est précédé d'un opérateur ou en début de chaîne c'est que le nombre est négatif(-x), je le réécris (!x)
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
    // Sinon le but est de faire d'abord les calculs entre parenthèses et dans le bon ordre
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
