<?php
class Controllers_Login extends Controllers_Base {

    private Models_User $model;

    public function __construct(Views_Base $view, array $params)
    {
        parent::__construct($view, $params);
        $this->model = new Models_User();
    }

    /**
     * @throws Exceptions_BadRequest
     * @throws Exceptions_Unauthorized
     * @throws Exceptions_NotFound
     */
    public function post()
    {
        $data = $_POST;

        if (!is_array($data) || empty($data) || !isset($data["user"]) || !isset($data["password"])) {
            throw new Exceptions_BadRequest("Invalid or missing data");
        }


        $user = $this->model->login($data["user"], $data["password"]);
        if ($user == null) {
            throw new Exceptions_Unauthorized("are you logged in?");
        }
        $details = $this->model->getFullUser($user->username);
        $token = Utils_Login::getUserCookie($user);
        Utils_Login::register_session($token);
        $this->view->render(['user' => $details]);
        /*
        header('Content-type: application/json');
        echo json_encode([
            'user' => $details
        ]);
    */
    }
}