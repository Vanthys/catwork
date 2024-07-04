<?php
include 'cors.php';

set_error_handler(function ($severity, $message, $filename, $lineno) {
    throw new ErrorException($message, 0, $severity, $filename, $lineno);
});

spl_autoload_register(function ($class_name) {
    require_once implode("/", explode("_", $class_name)) . '.php';
});



session_set_cookie_params([
    'samesite' => 'None',
    'secure' => true
]);


session_start();

error_log('Session ID: ' . session_id());
//var_dump(session_get_cookie_params());

$dispatcher = new Utils_Dispatcher();

$dispatcher->dispatch();
