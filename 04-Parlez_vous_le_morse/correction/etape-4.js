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

// Je déclare une fonction getMorseCharacterList qui prend en paramètre une string qui contient plusieurs lettres en morse séparées par des espaces
function getMorseCharacterList(text) {
    // Je découpe la string par les espaces
    return text.split(" ")
}

// Je déclare une fonction translateMorseCharacter qui prend en paramètre une lettre en morse
// Elle retourne la correspondance en caractère latin
function translateMorseCharacter(morse) {
    const morseToLatin = {
        '-': "T",
        '--': "M",
        '---': "O",
        '--.': "G",
        '--.-': "Q",
        '--..': "Z",
        '-.': "N",
        '-.-': "K",
        '-.--': "Y",
        '-.-.': "C",
        '-..': "D",
        '-..-': "X",
        '-...': "B",
        '.': "E",
        '.-': "A",
        '.--': "W",
        '.---': "J",
        '.--.': "P",
        '.-.': "R",
        '.-..': "L",
        '..': "I",
        '..-': "U",
        '..-.': "F",
        '...': "S",
        '...-': "V",
        '....': "H"
      }

    return morseToLatin[morse];
}

function decode(text) {
    // Je découpe mon text par les slashs pour séparer les différents mots en morse
    const list = getMorseCharacterList(text)


    // Je crée un tableau vide qui va contenir les caractères décodés
    const result = [];

    // Je déclare mon index pour itérer sur tous les mots
    let i = 0;
    while (i < list.length) {
        const morse = list[i];
        
        // Si on rencontre un slash alors on le décode comme étant un espace
        if (morse == "/") {
            result.push(" ");
        }
        // Sinon on utilise nos fonctions pour décoder le morse
        else {
            const decoded = translateMorseCharacter(morse);
            if (decoded != null) {
                result.push(decoded);
            }
        }
        i++;
    }

    return result.join("");
}

const encoded = ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
console.log(decode(encoded));