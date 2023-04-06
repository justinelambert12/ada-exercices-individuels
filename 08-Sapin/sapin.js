// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/09_sapin.md

//ETAPE 1
// function sapin(number) {
//     if (number<=0) {
//         return "\n"+etage(0,0);
//     }
//     let nombreEtagesTotal = number+2
//     let result="\n"
//     for (let i=0; i<=nombreEtagesTotal; i++){
//         result+=etage(i, nombreEtagesTotal)+"\n"
//     }
//     return result;
// }

// function etage(numero, nombreEtagesTotal){ // Je considère que l'étage 0 est le haut du sapin "+"
//     if (nombreEtagesTotal<1 || numero==0){
//         return "+".padStart(nombreEtagesTotal+1)
//     }
//     let result="/"
//     if (numero==1){
//         result+="*"
//     } else {
//         for (let i=0; i<Math.pow(2, numero-1)+1; i++){
//             result+="*"
//         }
//     }
//     result+="\\";
//     result=result.padStart(nombreEtagesTotal-numero+result.length);
//     return result;
// }

// // console.log("résultat de sapin(1) à atteindre",  "\n  +\n /*\\\n/***\\")
// // console.log("ma fonction etage()", etage(1,3));
// console.log("sapin(1)", sapin(1))
// console.log("sapin(2)", sapin(2))
// console.log("sapin(5)", sapin(5))
function sapin(number){
    let arrayFloors = ["", "  +", " /*\\", "/***\\"]
    if (number>1) {
        // console.log("sup à 1")
        let numberFloorAdditional = number-1;
        for (let i=0; i<number-1; i++){
            let lastFloor = arrayFloors[arrayFloors.length-1]
            let newFloor = lastFloor.slice(0,2)+"**"+lastFloor.slice(2);
            arrayFloors=arrayFloors.map(e=>" "+e);
            arrayFloors.push(newFloor);
        }
    }
    return arrayFloors.join("\n")
}
console.log("sapin(1)", sapin(1))
console.log("sapin(2)", sapin(2))
console.log("sapin(5)", sapin(5))