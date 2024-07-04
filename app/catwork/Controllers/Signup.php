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
            http_response_code(400);
            echo json_encode(['error' => 'Invalid or missing data']);
            die();
        }
        if ($this->model->exists($data["username"])) {//check if user already exists
            http_response_code(226);
            echo json_encode(['error' => 'User already exists']);
            die();
        }
        $original_password =  $data["password"];
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
            http_response_code(403);
            echo json_encode(['error' => 'Unauthenticated']);
            die();
        }

        $details = $this->model->getFullUser($user->username);
        $token = Utils_Login::getUserCookie($user);
        Utils_Login::register_session($token);

        header('Content-type: application/json');
        echo json_encode([
            'user' => $details,
            'cookie' => $token
        ]);

    }
}