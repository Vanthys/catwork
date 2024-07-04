<?php

class Utils_Login
{
    static function getUserCookie($user)
    {
        return hash("md5", $user->username ); //obviously we should replace this with two way encryption to make this performant at all

        //. date('Y-m-d H:i:s')
        //return $user->username;
    }
    static function register_session($token)
    {
        #session_start();
        #header('Authorization: Bearer ' . $token);
        #setcookie("session_id", $token);
        $_SESSION["user"] = $token;
        session_write_close();
    }

    static function delete_session()
    {
        if(isset($_SESSION["user"])){
            unset($_SESSION["user"]);
            session_unset();
            session_destroy();

        }
    }

    static function check_session_or_error()
    {
        $headers = getallheaders();
        if (!isset($_SESSION['user'])) {
        ##if (!isset($headers['Authorization'])) {
            http_response_code(403);
            echo json_encode(
                [
                    'error' => 'Are you logged in?',
                    //"[debug]headers" => getallheaders()
                ]);
            die();
        }
    }
}