function askName(){
    let user_name = prompt("Quel est ton nom ?");
    console.log(`Nom de l'utilisatrice ${user_name}`);
    document.body.innerHTML += `<h2>Coucou ${user_name} !</h2>`;
}

function askBirthYear(){
    let actual_year = new Date().getFullYear();
    console.log(`Année actuelle : ${actual_year}`);
    //Tant que l'année rentrée par l'utilisatrice n'est pas un nombre, on affiche une erreur et on repose la question
    let user_year;
    let isValid_year = false;
    while(!isValid_year){
        user_year = parseInt(prompt("Quelle est ton année de naissance ?"));
        if (user_year<=actual_year){
            isValid_year = true;
        } else {
            alert("L'année de naissance est invalide ! Rentre un chiffre...normalement inférieur à l'année actuelle.")
        }
    }
    //On calcule l'âge de l'utilisatrice et on l'affiche dans la page
    let user_age = actual_year - user_year;
    console.log(`Age de l'utilisatrice avant prise en compte du mois : ${user_age}`);
    document.body.innerHTML += `<h3>En se fondant juste sur ton année de naissance (${user_year}) tu as ${user_age} ans.`;
    //Petit test sur l'âge juste pour rire
    if (user_age>=110){ 
        document.body.innerHTML += `<br>C'est vachement vieux quand même 👵👴. Tu ne t'es pas trompée d'année de naissance ?`
    }
    document.body.innerHTML += `<\h3>`

    //BONUS : prendre en compte le mois de naissance
    //Tant que le mois rentré par l'utilisatrice n'est pas un nombre compris entre 1 et 12, on affiche une erreur et on repose la question
    let user_month;
    let isValid_month = false;
    while (!isValid_month){
        user_month = parseInt(prompt("Quel est ton mois de naissance ? (en nombre de 1 à 12)"));
        if (user_month>0 && user_month<=12){
            isValid_month = true;
        } else {
            alert("Le numéro du mois est invalide ! Rentre un chiffre entre 1 et 12.")
        }
    }
    let actual_month = new Date().getMonth(); //La fonction getMonth() retourne l'index du mois (janvier = 0)
    actual_month += 1; //On ajoute 1 à l'index pour que janvier corresponde au mois 1 et pas 0
    console.log(`Mois actuel : ${actual_month} / Mois de l'utilisatrice : ${user_month}`)
    //On met à jour l'âge de l'utilisatrice si son mois de naissance est plus loin dans l'année que le mois actuel
    //En fonction de cette condition on confirme l'âge ou on affiche l'âge corrigé 
    if (user_month > actual_month){
        user_age--;
        document.body.innerHTML += `<h3>CORRECTION ! En prenant en compte ton mois de naissance (${user_month}), tu as ${user_age} ans
            et ${12-(user_month-actual_month)} mois !</h3>`
    } else {
        document.body.innerHTML += `<h3>En prenant en compte ton mois de naissance (${user_month}), tu as bien ${user_age} ans.</h3>`
    }
    console.log(`Age de l'utilisatrice final : ${user_age}`);
}

askName();
askBirthYear();
