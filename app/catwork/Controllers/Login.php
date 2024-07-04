<?php
class Controllers_Login extends Controllers_Base {

    private Models_User $model;

    public function __construct(Views_Base $view, array $params)
    {
        parent::__construct($view, $params);
        $this->model = new Models_User();
    }

    public function post()
    {
        $data = $_POST;
        if (empty($data) or !isset($data["user"]) or !isset($data["password"])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid or missing data']);
            die();
        }


        $user = $this->model->login($data["user"], $data["password"]);
        if ($user == null) {
            http_response_code(403);
            echo json_encode(['error' => 'Unauthenticated']);
            //$this->view->render(new Exception("Unauthenticated"));
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

    public function get() {
        // TODO this is unsafe, use POST!
        $user = $_GET["user"];
        $pw = $_GET["password"];

        $user = $this->model->login($user, $pw);
        if ($user == null) {
            http_response_code(403);
            $this->view->render(new Exception("Unauthenticated"));
        }


        Utils_Login::register_session($user);
        header('Content-type: application/json');
        echo json_encode([$user]);
        die();
    }
}