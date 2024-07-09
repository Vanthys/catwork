<?php

abstract class Models_Base {

    protected PDO $connection;

    public function __construct() {
        $host = "127.0.0.1";
        $dbname = "fh_2024_team_1";
        $username = "fh_2024_webphp";
        $password = "fh_2024_webphp";
        $this->connection = new PDO('mysql:host=' . $host . '; dbname=' . $dbname . ';', $username, $password);
    }
}
