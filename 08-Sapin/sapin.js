// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/09_sapin.md

//ETAPE 1
function sapin_etape1(number){
    let arrayFloors = ["", "  +", " /*\\", "/***\\"]
    if (number>1) {
        for (let i=0; i<number-1; i++){
            let lastFloor = arrayFloors[arrayFloors.length-1]
            let newFloor = lastFloor.slice(0,2)+"**"+lastFloor.slice(2);
            arrayFloors=arrayFloors.map(e=>" "+e);
            arrayFloors.push(newFloor);
        }
    }
    return arrayFloors.join("\n")
}
// console.log("sapin_etape1(1)", sapin_etape1(1))
// console.log("sapin_etape1(2)", sapin_etape1(2))
// console.log("sapin_etape1(5)", sapin_etape1(5))

//ETAPE 2