// https://www.codingame.com/playgrounds/5422/js-interview-prep-recursion

// Question 1 : fonction qui retourne la somme des entiers de 1 à l'entier en argument
function sumRange(x) {
    if (x<=1) {
        return 1;
    }
    else {
        return x + sumRange(x-1);
    }
}
// console.log("sumRange(3) =", sumRange(3));

// Question 2 : fonction puissance
function power(x,n) {
    if (n<=0){
        return 1;
    }
    else {
        return x*power(x,n-1);
    }
}
// console.log("power() =",power(2,4));

// Question 3 : factoriel
function factorial(n) {
    if (n<=1) {
        return 1;
    }
    else {
        return n*factorial(n-1);
    }
}
// console.log("factorial()=", factorial(5));

// Question 4 : valeurs dans un tableau
function all(arr, callback){
    if (arr.length==1){
        return callback(arr[0]);
    }
    else {
        return (callback(arr[0]) && all(arr.slice(1), callback));
    }
}

// let allAreLessThanSeven = all([1,2,9], function(num){
// 	return num < 7;
// });

// console.log("all", allAreLessThanSeven);

// Question 5 : Produit d'un tableau
function productOfArray(arr) {
    if (arr.length==1) {
        return arr[0];
    }
    else {
        return arr[0]*productOfArray(arr.slice(1));
        //ou : return arr.shift() * productOfArray(arr);
        //la methode shift() permet de retirer le premier element du tableau et de le renvoyer
    }
}
// console.log("productOfArray = ",productOfArray([1,2,3,10]));

// Question 6 : search JS object
function contains(nestedObject, searchedValue) {
    let objValues = Object.values(nestedObject); // tableau des valeurs de l'objet
    let objects=[];
    for (let i=0; i<objValues.length; i++){ // je parcours toutes les valeurs de l'objet pour savoir s'il y a des objets
        if (typeof(objValues[i]) === 'object'){ // s'il y a une valeur qui est un objet on la met dans le tableau "objects"
            objects.push(objValues[i]);
        }
    }
    // let resultat = false;
    if (objects.length>0){ // s'il y a des valeurs qui sont des objets, on les parcourt à leur tour
        let resultat = false;
        for (let j=0; j<objects.length; j++){ // pour simplifier, il y aurait peut-être quelque chose à faire avec map et reduce ?
           resultat = resultat || contains(objects[j], searchedValue);
        }
        return resultat;
    } else { // sinon on check si la valeur cherchee est dans le tableau de valeur
        // return (resultat || objValues.includes(searchedValue));
        return objValues.includes(searchedValue);
    }
}

let nestedObject = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44,
                        something: 'foo2'
                    }
                }
            }
        }
    }
}

// let hasIt = contains(nestedObject, 44); // true
// console.log("hasIt =", hasIt);
// let doesntHaveIt = contains(nestedObject, "foo"); // false
// console.log("doesntHaveIt =", doesntHaveIt);

let nestedObject2 = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44,
                        something: 'foo2'
                    },
                    stuffInfini: {
                        other: 'trouve'
                    }
                }
            }
        },
        autreEssai: {
            marche: 'allez'
        }
    },
    toujoursPlus: {
        encore: {
            neSertpas: 'dommage',
            nonPlus: 'oups'
        },
        testeMoi: {
            priscilla: 'moi',
            unDeuxieme: 'ici',
            trouveCa: 'bravo'
        }
    }
}
// let hasIt2 = contains(nestedObject2, "allez"); // true
// console.log("hasIt =", hasIt2);

// Question 7 : parse a multi-dimensional array
function totalIntegers(arr){
    // console.log("Le tableau arr traite est :", arr);
    if (arr.length==0) {
        // console.log("Le tableau arr est vide.");
        return 0;
    } else {
       if (typeof(arr[0])==="object") { // OU PLUTOT ECRIRE : if (Array.isArray(arr[0]))
            // console.log("arr[0] est un tableau :", arr[0]);
            // console.log("sans ce premier element, le tableau est :", arr.slice(1));
            return (totalIntegers(arr[0]) + totalIntegers(arr.slice(1)));
        } else if (Number.isInteger(arr[0])) {
            // console.log("arr[0] est bien un entier :", arr[0]);
            return (1 + totalIntegers(arr.slice(1)));
        } else {
            // console.log("arr[0] n'est pas un entier :", arr[0]);
            return (0 + totalIntegers(arr.slice(1)));
        }
    }
}

// let seven = totalIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]]);
// console.log("totalIntegers=",seven)

// Question 8 : Write a function that sums squares of numbers in list that may contain more lists
function SumSquares(list) {
    if (list.length==0) {
        return 0
    }
    let total = 0;
    let firstElement = list.shift();
    if (Array.isArray(firstElement)){
        total += SumSquares(firstElement);
    } else {
        total += firstElement*firstElement;
    }
    return total+SumSquares(list);
}

// let l = [1,2,3]; 
// console.log(SumSquares(l)); // 1 + 4 + 9 = 14

// l = [[1,2],3]; 
// console.log(SumSquares(l)); // 1 + 4 + 9 = 14

// l = [[[[[[[[[1]]]]]]]]] 
// console.log(SumSquares(l)); // 1 = 1

// l = [10,[[10],10],[10]] 
// console.log(SumSquares(l)); // 100 + 100 + 100 + 100 = 400

// Question 9 : The function should return an array containing repetitions of the number argument. 
//For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative, return an empty array.
function replicate(rep, num) {
    if (rep<=0){
        return [];
    }
    let tab=replicate(rep-1,num); 
    tab.push(num); 
    return tab;
    // OU utiliser la fonction concat()
}

// console.log(replicate(3, 5)) // [5, 5, 5]
// console.log(replicate(1, 69)) // [69]
// console.log(replicate(-2, 6)) // []
