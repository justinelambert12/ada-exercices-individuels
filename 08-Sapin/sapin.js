// https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/09_sapin.md

//ETAPE 1
function sapin_etape1(number){
    let tree = ["  +", " /*\\", "/***\\"]
    if (number>1) {
        for (let i=0; i<number-1; i++){
            let lastFloor = tree[tree.length-1]
            let newFloor = lastFloor.slice(0,-2)+"**"+lastFloor.slice(-2);
            tree=tree.map(e=>" "+e);
            tree.push(newFloor);
        }
    }
    return tree.join("\n")
}
// console.log(sapin_etape1(1), "sapin_etape1(1)")
// console.log(sapin_etape1(2), "sapin_etape1(2)")
// console.log(sapin_etape1(5), "sapin_etape1(5)")

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

// console.log(sapin(1), "sapin(1)")
// console.log(sapin(2), "sapin(2)")
// console.log(sapin(5), "sapin(5)")
// console.log(sapin(7), "sapin(7)")

//ETAPE 4
function addFloorDecoration(floor) {
    // console.log("Etage de départ", floor)
    // Si l'étage n'a pas de place disponible pour les décorations ("*"), on ne le modifie pas
    if (!floor.includes("*")){
        return floor
    }

    let decoratedFloor = floor;
    const typeDecorations = ["+", "o", "-", "'", "~"]
    const numberPlacesAvailable = (floor.match(/\*/g)).length;
    // console.log("nombre places dispos", numberPlacesAvailable)
    if (numberPlacesAvailable>1){
        //Je calcule un nombre aléatoire de décorations à placer sur l'étage
        let randomNumberDecorations = 1+Math.floor(Math.random()*numberPlacesAvailable/2)
        // console.log("nombre de décorations générées", randomNumberDecorations)
        //Je vais générer un tableau de cette taille rempli de décorations aléatoires piochées dans les décorations autorisées
        let decorations=[];
        while (randomNumberDecorations>0){
            let randomIndexTypeDecorations = Math.floor(Math.random()*(typeDecorations.length))
            decorations.push(typeDecorations[randomIndexTypeDecorations]);
            randomNumberDecorations--
        }
        // console.log("tableau de décorations à ajouter", decorations)
        //Je vais dispose ces décorations dans l'étage, à la place des "*"
        //Je cherche quels sont les index des "*" dans l'étage
        let indexFirstPlaceAvailable = floor.indexOf("*");
        let indexLastPlaceAvailable = floor.lastIndexOf("*");
        let indexDecorationsPlaces = [];
        while (decorations.length>0){
            // Je calcule un index aléatoire possible où placer ma décoration
            let randomIndex = indexFirstPlaceAvailable + Math.floor(Math.random()*(indexLastPlaceAvailable-indexFirstPlaceAvailable))
            // console.log("random index", randomIndex)
            // Si je n'ai pas déjà placé une décoration à cet index, je peux l'ajouter
            if (!indexDecorationsPlaces.includes(randomIndex)){
                // Je supprime la dernière décoration du tableau des décorations
                let decorationToAdd = decorations.pop()
                // console.log("decoration à ajouter", decorationToAdd)
                // Je la place dans l'étage
                // console.log("decoratedFloor à l'index aléatoire", decoratedFloor[randomIndex])
                decoratedFloor=decoratedFloor.substring(0,randomIndex)+decorationToAdd+decoratedFloor.substring(randomIndex+1);
                // Je mets à jour le tableau qui répertorie les index des décorations placées
                indexDecorationsPlaces.push(randomIndex);
            }
        }
    }
    // console.log("nouvel étage", decoratedFloor)
    return decoratedFloor;
}
// console.log(addFloorDecoration("/****\\"));

function decoratedSapin(number){
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
    let treeDecorated = tree.map(e => addFloorDecoration(e));
    
    // return tree.join("\n")
    return treeDecorated.join("\n")
}
console.log(decoratedSapin(5));
