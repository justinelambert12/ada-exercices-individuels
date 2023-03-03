//ETAPE 1
function getLatinCharacterList(text) {
    let letters = [];
    for (i=0; i<text.length; i++){
        letters[i]=text[i];
    }
    return letters;
}

//console.log(getLatinCharacterList("Hello world !"))

//ETAPE 2
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

function translateLatinCharacter(latinCharacter) {
    return latinToMorse[latinCharacter];
}
//console.log(translateLatinCharacter("A"));

//ETAPE 3
function encode(textLatin){
    let textMorse = "";
    let encoded_list = getLatinCharacterList(textLatin.toUpperCase());
    for (i=0; i<encoded_list.length; i++){
        if (encoded_list[i]==" "){
            encoded_list[i] = "/";
            textMorse += encoded_list[i];
        } else if (encoded_list[i]=="." || encoded_list[i]=="-"){
            //ces caracteres sont utilises dans l'alphabet morse, on ne va pas les prendre
            console.log("Les caractères \".\" et \"-\" ne seront pas encodés !")
        } else { //Tout autre caractere
            if (encoded_list[i] in latinToMorse){
                encoded_list[i] = translateLatinCharacter(encoded_list[i]);
            }
            textMorse += encoded_list[i] + " "; 
        }
    }

    return textMorse;
}
//console.log(encode("Hello, world !"));

//ETAPE 4
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

function getMorseCharacterList(textMorse) {
    let characterList = [];
    let currentCharacter = "";
    for (i=0; i<textMorse.length; i++){
        if (textMorse[i]=="." || textMorse[i]=="-"){
            currentCharacter += textMorse[i];
        } else if (textMorse[i]==" "){
            if (currentCharacter.length!=0){
                characterList.push(currentCharacter);
                currentCharacter="";
            }
        } else {//Tout autre caractère qui serait de la ponctuation ou autre
            characterList.push(textMorse[i]);
        }
    }
    return characterList;
}
//console.log(getMorseCharacterList(". a "));
const testMorse = ".... . .-.. .-.. --- , / .-- --- .-. .-.. -.. / !"
//console.log(getMorseCharacterList(testMorse));

function translateMorseCharacter(morseCharacter){
    return morseToLatin[morseCharacter];
}

function decode(textMorse){
    let textLatin = "";
    let decoded_list = getMorseCharacterList(textMorse);
    for (i=0; i<decoded_list.length; i++){
        if (decoded_list[i]=="/"){
            textLatin += " ";
        } else { //Tout autre caractere
            if (decoded_list[i] in morseToLatin){
                decoded_list[i]=translateMorseCharacter(decoded_list[i]);
            }
            textLatin += decoded_list[i];
        }
    }
    return textLatin;
}
console.log(decode(testMorse));