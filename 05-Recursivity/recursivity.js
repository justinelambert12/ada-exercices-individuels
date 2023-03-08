// ETAPE 1 : fonction
function sum1(tab) {
    let sum = 0;
    for (let i=0; i<tab.length; i++){
        sum+=tab[i];
    }
    return sum;
}
let tabExemple=[1,2,5,9,15,4];
// console.log("La somme des elements de",tabExemple,"vaut",sum1(tabExemple));

// ETAPE 2 : recursivite
function sum2(tab) {
    if (tab.length==0){
        return 0;
    } 
    else {
        return tab[0]+sum2(tab.slice(1)); //slice("indice a partir duquel faire l'extraction" , "indice de fin")
    }
}
// console.log("La somme des elements de",tabExemple,"vaut",sum2(tabExemple));

// ETAPE 3 : factoriel
function factorial(num) {
    if (num==1){
        return num;
    }
    else {
        return num*factorial(num-1);
    }
}
let numExemple = 5;
// console.log("Factoriel de",numExemple,"=",factorial(numExemple));

// ETAPE 4 : suite de Fibonacci
// Pour afficher les éléments de la suite de Fibonacci
function fibonacci(x) {
    if (x==1) {
        let res=[0];
        // console.log(`Etape ${x} :`, res);
        return res;
    } else if (x==2) {
        let res=fibonacci(x-1);
        res.push(1);
        // console.log(`Etape ${x} :`, res);
        return res;
    }
    else {
        let res = fibonacci(x-1)
        res.push(res[res.length-1]+res[res.length-2]);
        // console.log(`Etape ${x} :`, res);
        return res;
    }
}
let xExemple = 20; // NE PAS METTRE UN NOMBRE TROP HAUT ! 
// console.log(`Les ${xExemple} premiers entiers de la suite de Fibonacci sont :`,fibonacci(xExemple));

//Autre fonction pour afficher le x-ième element de la suite de Fibonnaci
function calc_fibonacci(x) {
    if (x<=1) {
        return 0;
    } else if (x==2) {
        return 1;
    } else {
        return calc_fibonacci(x-1) + calc_fibonacci(x-2);
    }
}
console.log(`Le ${xExemple}-ieme element de la suite de Fibonacci vaut :`, calc_fibonacci(xExemple));