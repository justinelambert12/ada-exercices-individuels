// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/12_calculatrice_graphique_%F0%9F%A7%AE.md

function addToDisplay() {
    const displayedElement = document.getElementById("display");
    let displayedText = displayedElement.innerText;
    // Si l'affichage est à "0", on veut que la valeur de la première touche pressée apparaisse sans le "0", donc je vide "displayedText"
    if (displayedText == "0") {
        displayedText = "";
    }

    // il reste à gérer de ne pas afficher le "+" ou toutes autres opérations s'il n'y a pas encore de chiffres
    // et de ne pas pouvoir mettre plusieurs points (séparation décimales) à la suite
    displayedElement.innerText = displayedText + event.target.value;
}

// Il faut une fonction qui est appelée en appuyant sur égal pour faire le calcul