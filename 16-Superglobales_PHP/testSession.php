<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
    if (isset($_SESSION['first_name'])) {
        echo "<p>La session est bien lancée pour " . $_SESSION['first_name'] . "</p>";
    } else {
        echo "<p>Pas de variables de session...</p>";
    }
    ?>

    <a href="exercice.php">Retour à la page formulaire</a>
</body>
</html>