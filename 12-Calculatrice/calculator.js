// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/12_calculatrice_graphique_%F0%9F%A7%AE.md

function addToDisplay() {
    const displayedElement = document.getElementById("display");
    let displayedText = displayedElement.innerText;
    // Si l'affichage est à "0" et qu'on appuie sur une touche avec un chiffre, la valeur apparaît sans le "0", donc je vide "displayedText"
    if (displayedText == "0" && !([".", "+", "-", "*", "/"].includes(event.target.value))) {
        displayedText = "";
    }
    // il faut gérer de ne pas pouvoir mettre plusieurs points (séparation décimales) à la suite
    displayedElement.innerText = displayedText + event.target.value;
}

// Il faut une fonction qui est appelée en appuyant sur égal pour faire le calcul