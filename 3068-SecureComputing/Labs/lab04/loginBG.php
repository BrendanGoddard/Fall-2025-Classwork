<?php
// loginBG.php
// Simple demo login using PHP sessions (no database).
// Replace 'BG' in filenames if your initials differ.

session_start();

// If the form was submitted, "log in" and redirect.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // In this lab, assume credentials are correct.
    $userid = isset($_POST['userid']) ? trim($_POST['userid']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Basic guard: require a non-empty userid.
    if ($userid === '') {
        $error = 'Please enter a username.';
    } else {
        $_SESSION['userid'] = $userid;
        // Redirect to menu page
        header('Location: menuBG.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login (BG)</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 2rem; }
    form { max-width: 420px; display: grid; gap: 0.75rem; }
    label { font-weight: 600; }
    input { padding: 0.6rem 0.7rem; border: 1px solid #ccc; border-radius: 8px; }
    button { padding: 0.7rem 0.9rem; border-radius: 10px; border: 0; cursor: pointer; }
    .primary { background: #1a73e8; color: white; }
    .card { padding: 1.25rem; border: 1px solid #e5e7eb; border-radius: 14px; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
    .error { color: #b91c1c; font-weight: 600; }
    .hint { color: #6b7280; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>Login</h1>
  <div class="card">
    <?php if (!empty($error)): ?>
      <p class="error"><?php echo htmlspecialchars($error); ?></p>
    <?php endif; ?>
    <form method="post" action="loginBG.php" autocomplete="off">
      <div>
        <label for="userid">Username</label><br>
        <input id="userid" name="userid" type="text" placeholder="e.g. bgoddard" required>
      </div>
      <div>
        <label for="password">Password</label><br>
        <input id="password" name="password" type="password" placeholder="••••••••" required>
      </div>
      <div>
        <button class="primary" type="submit">Sign in</button>
      </div>
    </form>
    <p class="hint">For this lab, any credentials will “work” — we just store the username in the session.</p>
  </div>
</body>
</html>
