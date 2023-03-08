//ETAPE 1
function getLatinCharacterList(text) {
    // let letters = [];
    // for (i=0; i<text.length; i++){
    //     letters[i]=text[i];
    // }
    // return letters;
    //PLUS OPTIMISE
    return text.split("") //La fonction inverse est <array>.join("")
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
    let textMorse = ""
    let encoded_list = getLatinCharacterList(textLatin.toUpperCase());
    for (i=0; i<encoded_list.length; i++){
        if (encoded_list[i]=="." || encoded_list[i]=="-"){
            //ces caracteres sont utilises dans l'alphabet morse, on ne va pas les prendre
            console.log("Les caractères \".\" et \"-\" ne seront pas encodés !")
            alert("Les caractères \".\" et \"-\" ne sont pas encodés !")
        } else {
            if (encoded_list[i]==" "){
                encoded_list[i] = " / ";
                textMorse += encoded_list[i];
            } else if (encoded_list[i] in latinToMorse){
                    encoded_list[i] = translateLatinCharacter(encoded_list[i]);
            } //Pour tous les autres caractères, on les met tels quels dans la chaine
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
    //MA SOLUTION NE MARCHE PAS PUISQUE LE DERNIER CARACTERE EN MORSE N'EST PAS AJOUTE
    // let characterList = [];
    // let currentCharacter = "";
    // for (i=0; i<textMorse.length; i++){
    //     if (textMorse[i]=="." || textMorse[i]=="-"){
    //         currentCharacter += textMorse[i];
    //     } else if (textMorse[i]==" "){
    //         if (currentCharacter.length>0){
    //             characterList.push(currentCharacter);
    //             currentCharacter="";
    //         }
    //     } else {//Tout autre caractère qui serait de la ponctuation ou autre
    //         characterList.push(textMorse[i]);
    //     }
    // }
    // return characterList;
    return textMorse.split(" ");
}
//console.log(getMorseCharacterList(". a "));
//const testMorse = ".... . .-.. .-.. --- , / .-- --- .-. .-.. -.. / !"
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
//console.log(decode(testMorse));

//PLUS COURT : array.map() permet d'appliquer une fonction à chaque élément du tableau

//ETAPE 5 : page html
const encodeButton = document.getElementById("translateToMorse");
const latinEntry = document.getElementById("textLatin");
const decodeButton = document.getElementById("translateToLatin");
const morseEntry = document.getElementById("textMorse");

encodeButton.addEventListener('click', function encode_html() {
    let textLatin = latinEntry.value;
    let textMorse = encode(textLatin);
    document.getElementById("resultEncode").innerHTML = "<strong>Résultat :</strong> "+textMorse;
})

decodeButton.addEventListener('click', function decode_html() {
    let textMorse = morseEntry.value;
    let textLatin = decode(textMorse);
    document.getElementById("resultDecode").innerHTML = "<strong>Résultat :</strong> "+textLatin;
})

//OK ça marche dans un sens et dans l'autre pour même des phrases comme "Je fais n'importe quoi .oups"
//Le point disparaît et on garde l'apostrophe