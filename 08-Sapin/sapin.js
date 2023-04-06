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
function sapin_etape2(number){
    let tree = ["  +", " /*\\", "/***\\"]
    if (number>1) {
        for (let i=0; i<number-1; i++){
            let newFloor = createNewFloor_etape2(tree);
            tree=tree.map(e=>" "+e);
            tree.push(newFloor);
        }
    }
    return tree.join("\n")
}

function createNewFloor_etape2(tree){
    let lastFloor = tree[tree.length-1]
    let newFloor = "";
    if (tree.length>=4 && (tree.length-4)%3==0){
        let indexPattern = (tree.length-4)/3;
        newFloor = beginNewPattern_etape2(lastFloor, indexPattern);
    }
    else {
        newFloor = lastFloor.slice(0,-2)+"**"+lastFloor.slice(-2);
    }
    return newFloor;
}

function beginNewPattern_etape2(lastFloor, indexPattern){
    let newFloor=" "+lastFloor;
    if (indexPattern>0){
        newFloor=" "+newFloor.slice(0,-4)+newFloor.slice(-2);
    }
    return newFloor;
}

// console.log(sapin_etape2(1), "sapin_etape2(1)")
// console.log(sapin_etape2(2), "sapin_etape2(2)")
// console.log(sapin_etape2(5), "sapin_etape2(5)")
// console.log(sapin_etape2(7), "sapin_etape2(7)")
// console.log(sapin_etape2(15), "sapin_etape2(15)")

//ETAPE 3
function sapin(number){
    let tree = ["  +", " /*\\", "/***\\"]
    let stomp = ["  #"]

    if (number>1) {
        let floorAdditional = number-1
        
        for (let i=1; i<=floorAdditional; i++){
            let newFloor = createNewFloor(tree);
            tree=tree.map(e=>" "+e);
            stomp=stomp.map(e=>" "+e)
            tree.push(newFloor);
        }

        let numberOfPatterns = Math.floor((floorAdditional-2)/3)+1
        console.log("nombre de patterns", numberOfPatterns);
        if (numberOfPatterns>0){
            stomp=stomp.map(e=>e.slice(0,-2)+"##")
            for (let i=1; i<=numberOfPatterns; i++){
                stomp.push(stomp[0])
            }
        }
    }
    tree = tree.concat(stomp);
    return tree.join("\n")
}

function createNewFloor(tree){
    let lastFloor = tree[tree.length-1]
    let newFloor = "";
    if (tree.length>=4 && (tree.length-4)%3==0){
        let indexPattern = (tree.length-4)/3;
        newFloor = beginNewPattern(lastFloor, indexPattern);
    }
    else {
        newFloor = lastFloor.slice(0,-2)+"**"+lastFloor.slice(-2);
    }
    return newFloor;
}

function beginNewPattern(lastFloor, indexPattern){
    let newFloor=" "+lastFloor;
    if (indexPattern>0){
        newFloor=" "+newFloor.slice(0,-4)+newFloor.slice(-2);
    }
    return newFloor;
}

console.log(sapin(1), "sapin(1)")
console.log(sapin(2), "sapin(2)")
console.log(sapin(5), "sapin(5)")
console.log(sapin(7), "sapin(7)")