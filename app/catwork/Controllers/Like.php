<?php

class Controllers_Like extends Controllers_Base
{
    private $model;

    public function __construct(Views_Base $view, array $params)
    {
        parent::__construct($view, $params);
        $this->model = new Models_Post();
    }

    public function post()
    {
        if (!isset($this->params[0]) or !isset($this->params[1])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid parameters']);
            die();
        }
        $postId = $this->params[0];
        $authorId = $this->params[1];

        try{
            $this->model->set_likes($postId,$authorId);
            http_response_code(200);
            echo json_encode(['success' => 'Liked']);
        } catch(Exceptions_NotFound $e){
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
        }
    }

    public function delete()
    {
        if (!isset($this->params[0]) or !isset($this->params[1])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid parameters']);
            die();
        }
        $postId = $this->params[0];
        $authorId = $this->params[1];

        try{
            $this->model->remove_likes($postId,$authorId);
            http_response_code(200);
            echo json_encode(['success' => 'Like removed']);
        } catch(Exceptions_NotFound $e){
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
        }
    }

}