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
        for (let i=0; i < arrayBase.length; i++) {
            if (arrayBase[i] === arrayWord[i]) {
                wellPlaced.push(arrayWord[i]);
            }	else if(arrayBase.includes(arrayWord[i])) { //il faut vérifier que la lettre est bien dans le mot à deviner pour dire qu'elle est mal placée
                missplaced.push(arrayWord[i])
            }
        }
    
        for (const char of arrayWord) {
            if (arrayBase.includes(char) === false) {
                notInWord.push(char)
            }
        }
    
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
    if (result.wellPlaced.length === base.length) {
        document.getElementById("win").innerText = 'Vous avez gagné'
    }
}