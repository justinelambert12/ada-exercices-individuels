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

console.log(decoupeChaine("ab"))
console.log(decoupeChaine("aabbca"))

// ETAPE 2
// function decritChaine(chaine) {
//     let result="";
//     let current_char="";
//     for (let char of chaine){
//         let last_char = result.slice(-1);
//         if ()
//     }
// }

// console.log(decritChaine("ab"))
// console.log(decritChaine("aabbca"))