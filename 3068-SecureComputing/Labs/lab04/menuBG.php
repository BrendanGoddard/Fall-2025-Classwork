<?php
// menuBG.php
session_start();

// If user isn't logged in, send them to login page.
if (!isset($_SESSION['userid'])) {
    header('Location: loginBG.php');
    exit;
}

$userid = $_SESSION['userid'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Main Menu (BG)</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 2rem; }
    .card { padding: 1.25rem; border: 1px solid #e5e7eb; border-radius: 14px; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
    a.button { display: inline-block; padding: 0.6rem 0.8rem; background: #111827; color: #fff; border-radius: 10px; text-decoration: none; }
    .muted { color: #6b7280; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>Main Menu</h1>
  <div class="card">
    <p>Welcome, <strong><?php echo htmlspecialchars($userid); ?></strong> 🎉</p>
    <p class="muted">Session ID: <?php echo session_id(); ?></p>
    <ul>
      <li><a class="button" href="logoutBG.php">Log out</a></li>
    </ul>
  </div>
</body>
</html>
