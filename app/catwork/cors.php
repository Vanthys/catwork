<?php
/*
header("Access-Control-Allow-Origin: http://localhost:5173");



if (isset($_SERVER['HTTP_ORIGIN'])) {
    error_log("Origin: ".$_SERVER['HTTP_ORIGIN']);
}


header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Credentials, Set-Cookie, Origin, Accept");
header("Access-Control-Allow-Credentials: true");


header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Origin: http://127.0.0.1:5173");
header("Access-Control-Allow-Origin: https://localhost:5173");
header("Access-Control-Allow-Origin: https://localhost");
header("Access-Control-Allow-Origin: https://127.0.0.1:5173");

*/

$allowed_origins = [
    'http://localhost',
    'http://localhost:5173',
    'https://localhost',
    'http://127.0.0.1',
    'https://127.0.0.1',
    'https://localhost:5173'
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Credentials, Set-Cookie, Origin, Accept");
    header("Access-Control-Allow-Credentials: true");

    // Handle preflight OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(204); // No Content
        exit();
    }
}

