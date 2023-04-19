// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/11_suite_de_conway.md

// ETAPE 1
function decoupeChaine(chaine) {
    let result="";
    for (let char of chaine){
        let last_char = result.slice(-1);
        if (result.length>0 && char!=last_char){
            result+=" ";
        }
        result+=char;
    }
    return result;
}

// console.log(decoupeChaine("ab"))
// console.log(decoupeChaine("aabbca"))

// ETAPE 2
function decritChaine(chaine) {
    let result="";
    let current_char="";
    for (let char of chaine){
        let last_char = current_char.slice(-1);
        if (current_char.length>0 && char!=last_char){
            result+=current_char.length+last_char
            current_char="";
        }
        current_char+=char;
    }
    result+=current_char.length+current_char.slice(-1);
    return result;
}

// console.log(decritChaine("ab"))
// console.log(decritChaine("aabbca"))

// ETAPE 3
function suiteConway(carac, n) {
    if (n<=1) {
        return carac
    }
    return carac+"\n"+suiteConway(decritChaine(carac), n-1)
}

// console.log(suiteConway('a', 3))
// console.log(suiteConway('1', 3))
// console.log(suiteConway('abbgppp', 5))
// console.log(suiteConway('1', 10))