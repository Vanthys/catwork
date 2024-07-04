<?php
class Controllers_User extends Controllers_Base {

    private Models_User $model;

    public function __construct(Views_Base $view, array $params)
    {
        parent::__construct($view, $params);
        $this->model = new Models_User();
    }


    public function get() {


        if ($this->params) {
            $user = $this->model->getFullUser($this->params[0]);
            $data = $user->toArray();
            unset($data['password']); // to make sure the password could not be leaked delete the key "password"
            header('Content-type: application/json');
            echo json_encode($data);
            die();
        } else {
            $data = $this->model->findAll();
            header('Content-type: application/json');
            echo json_encode($data);
            die();
        }





    }
}