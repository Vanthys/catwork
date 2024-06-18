<?php

class Models_User extends Models_Base
{
    public function login($user, $pw): ?Domains_User
    {
        $query = "SELECT id, username, password FROM user WHERE username = :username";
        $statement = $this->connection->prepare($query);
        $statement->execute([":username" => $user]);
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        if (!$data) {
            return null;
        }
        $user = new Domains_User($data);
        if (password_verify($pw, $user->password)) {
            return $user;
        }
        return null;
    }

}