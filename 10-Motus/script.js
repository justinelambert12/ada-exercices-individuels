function tryWord(word, base) {
	// TODO: fix jeu sensible à la casse.
	// if (word === base) {
	// 	return true
    // } else {
  	    let wellPlaced = [];
        let notInWord = [];
        let missplaced = [];
    
  	    let arrayBase = (base.split('')).map(e=>e.toLowerCase());
        let arrayWord = (word.split('')).map(e=>e.toLowerCase());
    
		// for (let i = 0; i < arrayBase.length-1; i++) {
        for (let i=0; i < arrayWord.length; i++) { //on parcourt le mot testé 
            let occurencesRemaining = countOccurrences(arrayWord[i], arrayBase) - countOccurrences(arrayWord[i], wellPlaced) 
                                        - countOccurrences(arrayWord[i], missplaced);

            if (arrayBase[i] === arrayWord[i]) { //si la lettre est bien positionnée
                wellPlaced.push(arrayWord[i]); //on l'ajoute au tableau des lettres bien positionnées

                occurencesRemaining-=1;
                if (occurencesRemaining < 0) { //il y a une occurrence de la lettre en trop dans le tableau des lettres mal placées
                    let indexToDelete = missplaced.indexOf(arrayWord[i]);
                    missplaced.splice(indexToDelete,1) //on la supprime
                    notInWord.push(arrayWord[i]) //on la passe dans le tableau des lettres pas dans le mot
                }

            } else if (occurencesRemaining > 0) { //il reste des occurrences de la lettre, elle est donc mal placée
                    missplaced.push(arrayWord[i]);
            } else { //il n'y a pas d'occurrence de la lettre, elle n'est donc pas dans le mot
                    notInWord.push(arrayWord[i]);
            }
         
            // if(arrayBase.includes(arrayWord[i])) { //sinon, si la lettre est dans le mot à deviner, elle est mal placée
            //     missplaced.push(arrayWord[i])
            // } else { //sinon elle n'est pas dans le mot à deviner
            //     notInWord.push(arrayWord[i]);
            // }
        }
        //Je gère ce bout de code plus haut
        // for (const char of arrayWord) {
        //     if (arrayBase.includes(char) === false) {
        //         notInWord.push(char)
        //     }
        // }
    
        return { wellPlaced: wellPlaced, missplaced: missplaced, notInWord: notInWord }
    // }
}

function guess() {
    let base = 'dictionnaire'
	let word = document.getElementById("word").value
	let result = tryWord(word, base)
    document.getElementById("info").innerText = 'Le mot à trouver contient '+base.length+' lettres. La première lettre est : '+base[0];
    document.getElementById("word").value = ''
 	document.getElementById("try").innerText = word
    document.getElementById("well").innerText = 'Bien placé: '+result.wellPlaced.join(', ')
    document.getElementById("miss").innerText = 'Mal placé: '+result.missplaced.join(', ')
    document.getElementById("not").innerText = 'Pas dans le mot: '+result.notInWord.join(', ')
    if (result.wellPlaced.length === base.length && result.missplaced.length===0 && result.notInWord.length===0) {
        document.getElementById("win").innerText = 'Vous avez gagné'
    }

    displayWord(word);
}

function countOccurrences(element, array){
    let count = 0;
    for (let i=0; i<array.length; i++){
        if (element === array[i]){
            count++;
        }
    }
    return count;
}
// console.log(countOccurrences("a", "advantage".split("")));

function displayWord(word){
    let container = document.getElementById("container")
    let div_word = document.createElement("div")
    div_word.className = "displayedWord"
    for (char of word) {
        let charToDisplay = document.createElement("span")
        charToDisplay.innerText = char;
        charToDisplay.className = "missPlaced"
        div_word.appendChild(charToDisplay);
    }
    container.appendChild(div_word);
}