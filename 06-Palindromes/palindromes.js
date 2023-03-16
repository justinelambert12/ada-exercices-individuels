// ETAPE 1 : verifier la validite de la date
function isValidYear(year){
    return year>999 && year<=9999;
}

function isValidMonth(month){
    return month>0 && month<=12;
}

function maxDaysInMonth (month, year){
    switch (month) {
        // Mois de 31 jours
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        // Mois de 30 jours
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        // Pour le mois de fevrier, on teste si l'annee est bissextile
        case 2:
            if (year%400 == 0 || (year%4 == 0 && year%100 !=0)){ // annees bissextiles 
                return 29
            } else {
                return 28;
            }
    }
}

function isValidDay(day, month, year){
    return day>0 && day<=maxDaysInMonth(month,year);
}

function isValidDate(strFrench) {
    const elements = strFrench.split('/');
    if (elements.length == 3){
        // console.log(elements);
        const [day, month, year] = elements.map(element => parseInt(element));
        // console.log(day, month, year);
        return isValidYear(year) && isValidMonth(month) && isValidDay(day, month, year);
    } else {
        return false
    }    
}

// const dateExemple = "29/13/1992"
// console.log(`${dateExemple} est une date valide ? :`, isValidDate(dateExemple));

// ETAPE 2 : verifier si la date est un palindrome

function isPalindrome_old(dateStr) {
    if (isValidDate(dateStr)){
        // On enleve les "/" de la date
        const dateInit = dateStr.split('/').join('')
        // On construit une date miroir
        const dateMirror = dateInit.split('').reverse().join('');

        return dateMirror === dateInit;
    } else {
        return false;
    }
}
// const dateExemple2 = "11/02/2011"
// //par exemple "11/02/2011" est un palindrome
// console.log(`${dateExemple2} est une date palindrome ? :`, isPalindrome_old(dateExemple2));

// ETAPE 3 : afficher les x prochaines dates palindromes à compter d'aujourd'hui

// Inutile 
// function nextDay(day, month, year){ // La fonction retourne un tableau avec 3 valeurs
//     let newDay = [day, month, year];
//     if (isValidDay(day+1, month, year)){
//         newDay[0]=day+1;
//     } else { // on change de mois
//         newDay[0]=1;
//         if (isValidDay(day, month+1, year)){ // si le mois suivant ne nous fait pas changer d'annee
//             newDay[1]=month+1;
//         } else { // sinon on change d'annee
//             newDay[1]=1;
//             newDay[2]=year+1
//         }
//     }
//     return newDay;
// }
//TROOOP LONG !!
// function getNextPalindromes_old(x) {
//     const date = new Date();
//     let day = date.getDate();
//     let month = date.getMonth()+1; // la numerotation avec getMonth() commence a 0
//     let year = date.getFullYear();
//     let i = 0;
//     let palindromes=[];

//     while (i<x) {
//         [day, month, year] = nextDay(day, month, year); // Modifie les variables day, month, year pour correspondre au jour suivant
//         let dayStr = day<10 ? "0"+day : ""+day;
//         let monthStr = month<10 ? "0"+month : ""+month;
//         let yearStr = ""+year;
//         let nextDate = `${dayStr}/${monthStr}/${yearStr}`;
//         if (isPalindrome(nextDate)){
//             palindromes.push(nextDate);
//             console.log(nextDate);
//             i++
//         }
//     }
// }

// Inutile pour le moment
// function dateToString(day, month, year){
//     let dayStr = day<10 ? "0"+day : ""+day;
//     let monthStr = month<10 ? "0"+month : ""+month;
//     let yearStr = ""+year;
//     let nextDate = `${dayStr}/${monthStr}/${yearStr}`;
//     return nextDate;
// }

function getNextPalindromes(x){
    let year = (new Date()).getFullYear();
    let i = 0;
    let palindromes = [];
    // Je mets un timer pour empêcher que ça dure trop longtemps
    const debut = Date.now();
    while (i<x){
        if (Date.now()-debut>1000){ 
            break;
        } else {
            let yearStr = ""+year;
            let yearMirror = yearStr.split('').reverse();
            let dayStr = yearMirror[0]+yearMirror[1];
            let monthStr = yearMirror[2]+yearMirror[3];
            let dateToTest = dayStr+"/"+monthStr+"/"+yearStr;

            if (isValidDate(dateToTest)){
                palindromes.push(dateToTest);
                console.log(dateToTest);
                i++;
            }
            year++;
        }
    }
    return palindromes;
}

// getNextPalindromes(8);

// ETAPE 4 : refactorer la fonction isPalindrome pour en prendre en compte n'importe quelle chaine de caractère

function isPalindrome(str) {
    let strMiroir = str.split('').reverse().join('');
    return (strMiroir === str)
}

function isDatePalindrome(str) {
    if (isValidDate(str)) {
        dateStr = str.split('/').join('');
        return isPalindrome(dateStr);
    } else {
        return false;
    }
}

let strExemple = "radar";
console.log(`La chaine de caractere ${strExemple} est un palindrome :`, isPalindrome(strExemple));
let dateExemple3 = "02/02/2020";
console.log(`La chaine de caractere ${dateExemple3} est une date et un palindrome :`, isDatePalindrome(dateExemple3));

