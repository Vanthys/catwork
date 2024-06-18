<?php

class Utils_Login
{
    static function register_session($user)
    {
        $_SESSION["user"] = $user;
    }

    static function delete_session()
    {
        unset($_SESSION["user"]);
    }

    static function check_session_or_error()
    {
        if (!isset($_SESSION["user"])) {
            throw new Exceptions_Unauthorized("Unauthorized");
        }
    }
}