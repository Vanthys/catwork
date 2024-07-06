<?php

class Models_User extends Models_Base
{
    public function login($user, $pw): ?Domains_User
    {
        $query = "SELECT id, username, password, description, image FROM user WHERE username = :username";
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


    public function getFullUser($username): ?Domains_User
    {
        $query = "SELECT id, username, description, image FROM user WHERE username = :username";
        $statement = $this->connection->prepare($query);
        $statement->execute([":username" => $username]);
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            return new Domains_User($data);
        } else {
            throw new Exceptions_NotFound("Not found");
        }
        return null;
    }

    public function exists($username): bool
    {
        $query = "SELECT id, username FROM user WHERE username = :username";
        $statement = $this->connection->prepare($query);
        $statement->execute([":username" => $username]);
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            return true;
        }
        return false;
    }


    public function findById($id): Domains_User
    {
        $query = "SELECT id, username, description, image FROM user WHERE id = :id;";
        $statement = $this->connection->prepare($query);
        $statement->execute([':id' => $id]);
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            return new Domains_User($data);
        } else {
            throw new Exceptions_NotFound();
        }
    }


    public function insert(Domains_User $obj): Domains_User
    {
        $query = "INSERT INTO user (username, password, description, image) VALUES (:username, :password, :description, :image)";
        $statement = $this->connection->prepare($query);
        $statement->execute([
            ":username" => $obj->username,
            ":password" => $obj->password,
            ":description" => $obj->description,
            ":image" => $obj->image
        ]);
        $lastId = $this->connection->lastInsertId();
        return $this->findById($lastId);
    }



    public function getUserByToken($token): ?Domains_User
    {
        $query = "SELECT id, username, description, image FROM user";
        $statement = $this->connection->prepare($query);
        $statement->execute();
        $users = $statement->fetchAll(PDO::FETCH_ASSOC);

        foreach ($users as $user) {
            //error_log(implode(" ", $user));
            $userObj = new Domains_User($user);//($user["username"]);

            if (Utils_Login::getUserCookie($userObj) === $token) {
                return $userObj;
            }
        }

        throw new Exceptions_NotFound();


    }

    public function findAll() : array
    {
        $query = "SELECT id, username FROM user";
        $statement = $this->connection->query($query);
        return array_map(function ($users) {
            return new Domains_User($users);
        }, $statement->fetchAll(PDO::FETCH_ASSOC));
    }


}