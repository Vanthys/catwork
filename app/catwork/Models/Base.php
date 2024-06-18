<?php

abstract class Models_Base {

    protected PDO $connection;

    public function __construct() {
        $host = "127.0.0.1";
        $dbname = "catwork";
        $username = "root";
        $password = "";
        $this->connection = new PDO('mysql:host=' . $host . '; dbname=' . $dbname . ';', $username, $password);
    }
}
