<?php
$base = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';

$base .= $_SERVER['SERVER_NAME'];

header("Location: " . $base . "/caspio/ich/public/login.php");
die();