<?php
// logoutBG.php — Activity F05
session_start();

// Wipe session data
$_SESSION = [];

// Remove session cookie if present
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params['path'], $params['domain'],
        $params['secure'], $params['httponly']
    );
}

// Finally destroy session
session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Logged Out (BG)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root { color-scheme: light dark; }
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 2rem; }
    .card { max-width: 420px; padding: 1.25rem; border: 1px solid #e5e7eb; border-radius: 14px; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
    a.button { display: inline-block; padding: 0.6rem 0.8rem; background: #2563eb; color: #fff; border-radius: 10px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <h1>You’ve been logged out</h1>
    <p><a class="button" href="loginBG.php">Return to Login</a></p>
  </div>
</body>
</html>
