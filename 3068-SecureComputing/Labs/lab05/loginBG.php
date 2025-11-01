<?php
// loginBG.php — Activity F05 (MySQL-backed login)

session_start();

// If already logged in, go to menu
if (isset($_SESSION['userid'])) {
    header('Location: menuBG.php');
    exit;
}

// Handle form submit
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userid   = isset($_POST['userid']) ? trim($_POST['userid']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if ($userid === '' || $password === '') {
        $error = 'Please enter both username and password.';
    } else {
        // ---- MySQL connection (per lab spec) ----
        $mysqli = @new mysqli('localhost', 'root', '', 'test');
;
        if ($mysqli->connect_errno) {
            $error = 'Database connection failed.';
        } else {
            // Use prepared statement to avoid SQL injection
            $stmt = $mysqli->prepare('SELECT password FROM users WHERE userid = ?');
            $stmt->bind_param('s', $userid);
            $stmt->execute();
            $stmt->bind_result($dbPassword);
            if ($stmt->fetch()) {
                // For this lab, table stores plaintext passwords.
                // (If you later switch to password_hash(), use password_verify() here.)
                if ($password === $dbPassword) {
                    $_SESSION['userid'] = $userid;
                    $stmt->close();
                    $mysqli->close();
                    header('Location: menuBG.php');
                    exit;
                } else {
                    $error = 'Invalid username or password.';
                }
            } else {
                $error = 'Invalid username or password.';
            }
            $stmt->close();
            $mysqli->close();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login (BG)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root { color-scheme: light dark; }
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 2rem; }
    .card { max-width: 420px; padding: 1.25rem; border: 1px solid #e5e7eb; border-radius: 14px; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
    .row { margin-bottom: .9rem; }
    label { font-weight: 600; }
    input { width: 100%; padding: .6rem .7rem; border: 1px solid #d1d5db; border-radius: 10px; }
    .primary { background: #2563eb; color: #fff; border: none; padding: .7rem .9rem; border-radius: 10px; cursor: pointer; }
    .error { background: #fee2e2; color: #991b1b; padding: .6rem .75rem; border-radius: 8px; margin-bottom: .8rem; }
  </style>
</head>
<body>
  <h1>Login</h1>
  <div class="card">
    <?php if (!empty($error)): ?>
      <div class="error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>
    <form method="post" action="loginBG.php" autocomplete="off">
      <div class="row">
        <label for="userid">Username</label><br>
        <input id="userid" name="userid" type="text" placeholder="e.g. bgoddard" required>
      </div>
      <div class="row">
        <label for="password">Password</label><br>
        <input id="password" name="password" type="password" placeholder="••••••••" required>
      </div>
      <div class="row">
        <button class="primary" type="submit">Sign in</button>
      </div>
    </form>
  </div>
</body>
</html>
