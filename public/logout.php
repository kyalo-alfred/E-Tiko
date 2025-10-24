<?php
require_once __DIR__ . '/../app/config/config.php';
require_once __DIR__ . '/../app/helpers/Session.php';

Session::start();
Session::destroy();

header('Location: ' . APP_BASE_URL . '/login.php');
exit;
