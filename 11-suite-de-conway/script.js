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
    let current_string="";
    for (let current_char of chaine){
        let previous_char = current_string.slice(-1);
        if (current_string.length>0 && current_char!=previous_char){
            result+=current_string.length+previous_char
            current_string="";
        }
        current_string+=current_char;
    }
    result+=current_string.length+current_string.slice(-1);
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