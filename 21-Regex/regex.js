// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/21_regex_%F0%9F%A7%90.md
// https://regex101.com/

// ETAPE 0
// Déclaration d'une regex et stockage dans une constante :
// const exp = /<ma regex>/
// Application à une string avec la fonction match :
// const res = "une chaine de char".match(exp)

// Règles de regex
// ----------------
// [abc] Matches either an a, b or c character
// [^abc] Matches any character except for an a, b or c
// [a-z] Matches any characters between a and z, including a and z
// [^a-z] Matches any characters except those in the range a-z
// [a-zA-Z] Matches any characters between a-z or A-Z.
// . Matches any character other than newline (or including line terminators with the /s flag)
// a|b Matches either what is before the | or what is after it - in this case `a` or `b`
// \s Matches any space, tab or newline character | \S Matches anything other than a space, tab or newline
// \d Matches any decimal digit | \D
// \w Matches any letter, digit or underscore | \W
// (?:...) A non-capturing group allows you to apply quantifiers to part of your regex but does not capture/assign an ID
// (...) Isolates part of the full match to be later referred to by ID within the regex or the matches array. IDs start at 1
// a? Matches an `a` character or nothing
// a* Matches zero or more consecutive `a` characters
// a+ Matches one or more consecutive `a` characters
// a{3,6} Matches between 3 and 6 (inclusive) consecutive `a` characters | a{3} | a{3,}
// ^ Matches the start of a string without consuming any characters. If /m multiline mode is used, this will also match immediately after a newline character.
// $ Matches the end of a string without consuming any characters. If /m multiline mode is used, this will also match immediately before a newline character.
// \b Word boundary. Matches, without consuming any characters, immediately between a character matched by \w and a character not matched by \w (in either order)
// \B Non word boundary

const str = "J'utilise les expressions regulière pour retrouver des schémas de text au sein d'une chaine de caractères.";

// ETAPE 1 : Trouver l'expression qui renvoie le nombre de caractère "de"
const exp1 = /\bde\b/g;
// ETAPE 2 : ajouter un opérateur logique OR (|) pour avoir dans le même résultat le nombre articles "de" et "des".
const exp2 = /\b(de|des)\b/g;
// ETAPE 3 : Utiliser un "?" pour, avec la même expression, récuperer le nombre de "de", "des" et "les"
const exp3 = /\b(d|l)es?\b/g;
// ETAPE 4 : Écrire la regex qui retourne le nombre de caractères alphabétiques dans la chaine
const exp4 = /[a-zA-Z]/g;
// ETAPE 5 : Écrire l'expression qui renvoie tous les caractères spéciaux présents dans la phrase (ponctuation et accents)
const exp = /[^(\w|\s)]/g;


const res = str.match(exp);
console.log("res : ", res, "/ nombre d'occurrences :", res.length);

