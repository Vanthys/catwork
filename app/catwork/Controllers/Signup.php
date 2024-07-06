<?php
class Controllers_Signup extends Controllers_Base {

    private Models_User $model;

    public function __construct(Views_Base $view, array $params)
    {
        parent::__construct($view, $params);
        $this->model = new Models_User();
    }

    public function post()
    {
        $data = $_POST;
        if (empty($data) or
            !isset($data["username"]) or
            !isset($data["password"])
        ) {
            throw new Exceptions_BadRequest("Invalid or missing parameters");
        }


        if ($this->model->exists($data["username"])) {//check if user already exists
            throw new Exceptions_AmUsed("Username already exists");
        }

        $original_password = $data["password"];
        $data["password"] = password_hash($original_password, PASSWORD_DEFAULT);

        $obj = new Domains_User($data);
        $newUser = $this->model->insert($obj);

        if ($newUser == null) {
            http_response_code(500);
            echo json_encode(['error' => 'Unknown Server Error']);
            die();
        }

        $user = $this->model->login($data["username"], $original_password); //Directly login into this

        if ($user == null) {
           throw new Exceptions_Unauthorized("Login failed");
        }

        $details = $this->model->getFullUser($user->username);

        $token = Utils_Login::getUserCookie($user);
        Utils_Login::register_session($token);

        $this->view->render(['user' => $details]);

    }
}