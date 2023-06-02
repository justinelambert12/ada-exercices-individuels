<!-- https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/16_Superglobales_PHP.md -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php $user_name = $_GET['first_name'];
    if (!isset($user_name)) {
        $user_name = $_POST['first_name'];
        if (!isset($user_name)) {
            $user_name = "anonyme";
        }
    } 
    echo "<p>Hello " . $user_name . "</p>"?>

    <form action="exercice.php" method="post">
        <p>Votre nom <input type="text" name="first_name" /></p>
        <p><input type="submit" value="OK"></p>
    </form>
    
</body>
</html>