// Je crée une fonction qui prend en paramètre une chaine de caractères nommé "text"
function getLatinCharacterList(text) {
    // J'utilise la fonction split pour découper text dans un tableau
    // Je stocke le résultat dans characters
    const characters = text.split("");

    // Je retourne mon tableau comme demandé
    return characters;
}

getLatinCharacterList("Hello, world")