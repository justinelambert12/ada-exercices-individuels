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
            if (arrayBase[i] === arrayWord[i]) { //si la lettre est bien positionnée
                wellPlaced.push(arrayWord[i]);
            } else if(arrayBase.includes(arrayWord[i])) { //sinon, si la lettre est dans le mot à deviner, elle est mal placée
                missplaced.push(arrayWord[i])
            } else { //sinon elle n'est pas dans le mot à deviner
                notInWord.push(arrayWord[i]);
            }
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
    document.getElementById("word").value = ''
 	document.getElementById("try").innerText = word
    document.getElementById("well").innerText = 'Bien placé: '+result.wellPlaced.join(', ')
    document.getElementById("miss").innerText = 'Mal placé: '+result.missplaced.join(', ')
    document.getElementById("not").innerText = 'Pas dans le mot: '+result.notInWord.join(', ')
    if (result.wellPlaced.length === base.length && result.missplaced.length===0 && result.notInWord.length===0) {
        document.getElementById("win").innerText = 'Vous avez gagné'
    }
}