<?php
class Controllers_User extends Controllers_Base {

    private Models_User $model;

    public function __construct(Views_Base $view, array $params)
    {
        parent::__construct($view, $params);
        $this->model = new Models_User();
    }


    public function get() {

        $data = null;

        if ($this->params) {
            $data = $this->model->getFullUser($this->params[0]);
        } else {
            $data = $this->model->findAll();
        }
        $this->view->render($data);

    }
}