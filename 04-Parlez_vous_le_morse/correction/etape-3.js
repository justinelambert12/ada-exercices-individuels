function getLatinCharacterList(text) {
    const characters = text.split("");
    return characters;
}

function translateLatinCharacter(latinCharacter) {
	const latinToMorse = {
		'A':'.-',
		'B':'-...',
		'C':'-.-.',
		'D':'-..',
		'E':'.',
		'F':'..-.',
		'G':'--.',
		'H':'....',
		'I':'..',
		'J':'.---',
		'K':'-.-',
		'L':'.-..',
		'M':'--',
		'N':'-.',
		'O':'---',
		'P':'.--.',
		'Q':'--.-',
		'R':'.-.',
		'S':'...',
		'T':'-',
		'U':'..-',
		'V':'...-',
		'W':'.--',
		'X':'-..-',
		'Y':'-.--',
		'Z':'--..'
	}

	return latinToMorse[latinCharacter];
}

function encode(text) {
    // Je stocke ma liste de caractères dans la variables characters
    const latinCharacters = getLatinCharacterList(text);

    // Je crée un tableau vide qui va contenir les strings en morse
    const result = [];

    // J'initialise mon index à 0 pour ma boucle
    let index = 0;

    // J'itère n fois (n = la longueur de la liste des caractères)
    while (index < latinCharacters.length) {

        // J'accède et je stocke le caractère à encoder grâce à l'index
        const latinCharacter = latinCharacters[index];

        // J'encode le caractère récupéré pour l'encode via la fonction translateLatinCharacter
        const morse = translateLatinCharacter(latinCharacter);

        // J'ajoute ma string encodé dans mon tableau result
        result.push(morse);

        // J'incrémente l'index pour la boucle
        index++;
    }

    // Je retourne result
    return result;
}

encode("MORSE");