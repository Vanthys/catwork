<?php

class Controllers_Like extends Controllers_Base
{
    private Models_Post $post_model;
    private Models_User $user_model;


    public function __construct(Views_Base $view, array $params)
    {
        parent::__construct($view, $params);
        $this->post_model = new Models_Post();
        $this->user_model = new Models_User();
    }

    public function post()
    {
        Utils_Login::check_session_or_error();

        //we actually already have the user here

        if (!isset($this->params[0])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid parameters']);
            die();
        }

        $user = $this->user_model->getUserByToken($_SESSION["user"]);
        $postId = $this->params[0];
        $authorId = $user->id;

        try{
            $this->post_model->set_likes($postId,$authorId);
            http_response_code(200);
            echo json_encode(['success' => 'Liked']);
        } catch(Exceptions_NotFound $e){
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
        }
    }

    public function delete()
    {
        Utils_Login::check_session_or_error();

        if (!isset($this->params[0])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid parameters']);
            die();
        }
        $postId = $this->params[0];
        $user = $this->user_model->getUserByToken($_SESSION["user"]);
        $authorId = $user->id;

        error_log($user->username);
        try{
            $this->post_model->remove_likes($postId,$authorId);
            http_response_code(200);
            echo json_encode(['success' => 'Like removed']);
        } catch(Exceptions_NotFound $e){
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
        }
    }

}