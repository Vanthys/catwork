<?php

class Controllers_Post extends Controllers_Base
{

    private $model;

    public function __construct(Views_Base $view, array $params)
    {
        parent::__construct($view, $params);
        $this->model = new Models_Post();
    }


    public function get()
    {
//        Utils_Login::check_session_or_error();
        if ($this->params) {
            $data = $this->model->findById($this->params[0]);
        } else {
            $data = $this->model->findAll();
        }
        $this->view->render($data);
    }

    public function post()
    {
        $data = $_POST;
        if (empty($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid or missing data']);
            die();
        }

        //here we need to set $data->timestamp to the current server  datetime()
        $data['timestamp'] = date('Y-m-d H:i:s');

        $obj = new Domains_Post($data);

        $newPost = $this->model->insert($obj);

        http_response_code(301);
        //header('Location: '.'/catwork/post/' . $data->id);
        die();
    }



    public function delete() {
        if (!isset($this->params[0]) or !isset($this->params[1])) {
            throw new Exception("Id not found");
        }
        $this->model->delete($this->params[0],$this->params[1]);
        http_response_code(204);
    }
}