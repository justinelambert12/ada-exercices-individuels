// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/09_sapin.md

//ETAPE 1
function sapin(number){
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
console.log("sapin(1)", sapin(1))
console.log("sapin(2)", sapin(2))
console.log("sapin(5)", sapin(5))