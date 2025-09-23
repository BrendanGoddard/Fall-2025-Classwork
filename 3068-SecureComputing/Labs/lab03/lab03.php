<?php 

    $number1 = isset($_POST['number1']) ? $_POST['number1'] : '';
    $number2 = isset($_POST['number2']) ? $_POST['number2'] : '';  
    $total = '';

    if ($_SERVER["REQUEST_METHOD"] == "POST" && $number1 !== '' && $number2 !== '') {
        $total = $number1 + $number2;

    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PHP Calculator</title>
</head>
<body>
    <h2>Calculator</h2>

    <form method="post" action="">
        Number 1: <input type="number" step="any" name="number1" value="<?php echo htmlspecialchars($number1); ?>"><br><br>
        Number 2: <input type="number" step ="any" name="number2" value="<?php echo htmlspecialchars($number2); ?>"><br><br>
        <input type="submit" value="Calculate">
     </form>

     <?php
     if ($total !== '') {
        echo "<h3>Total: $total</h3>";
     }
     ?>
</body>
</html>