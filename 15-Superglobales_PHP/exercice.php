<!-- https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/16_Superglobales_PHP.md -->
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
    if (isset($_GET['first_name'])) {
        $user_name = $_GET['first_name'];
    } elseif (isset($_SESSION['first_name'])) {
        $user_name = $_SESSION['first_name'];
    } elseif (isset($_POST['first_name'])) {
        $user_name = $_POST['first_name'];
        $_SESSION['first_name'] = $user_name;
    } else {
        $user_name = "anonyme";
    }
    
    echo "<p>Hello " . $user_name . "</p>";
    
    if (!isset($_SESSION['first_name'])) {?>

    <form action="exercice.php" method="post">
        <p>Votre nom <input type="text" name="first_name" /></p>
        <p><input type="submit" value="OK"></p>
    </form>

    <?php }?>

    <a href="testSession.php">Changer de page pour tester la sauvegarde de la session</a><br>

    <?php 
    if (isset($_POST['reset'])) {
        session_unset();
        header("Location: exercice.php");
    }
    if (isset($_SESSION['first_name'])) {?>

    <form action="exercice.php" method="post">
        <input type="submit" name="reset" id="reset" value="reset">
    </form>

    <?php } ?>

    <?php 
    
    ?>
    
</body>
</html>