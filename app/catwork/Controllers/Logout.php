<?php
class Controllers_Logout extends Controllers_Base {

    public function get() {
        Utils_Login::delete_session();
        //header('Location: '.'http://localhost/catwork/');
        die();
    }
}