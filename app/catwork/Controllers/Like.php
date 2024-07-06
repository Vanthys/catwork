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

    /**
     * @throws Exceptions_BadRequest
     * @throws Exceptions_NotFound
     */
    public function post()
    {
        Utils_Login::check_session_or_error();

        if (!isset($this->params[0])) {
            throw new Exceptions_BadRequest("invalid params");
        }

        $user = $this->user_model->getUserByToken($_SESSION["user"]);
        $postId = $this->params[0];
        $authorId = $user->id;


        $this->post_model->set_likes($postId,$authorId);
        $this->view->render(['success' => 'Liked']);
        /*
        http_response_code(200);
        echo json_encode(['success' => 'Liked']);
    */
    }

    public function delete()
    {
        Utils_Login::check_session_or_error();

        if (!isset($this->params[0])) {
            throw new Exceptions_BadRequest("invalid params");
        }

        $postId = $this->params[0];
        $user = $this->user_model->getUserByToken($_SESSION["user"]);
        $authorId = $user->id;

        //error_log($user->username);

        $this->post_model->remove_likes($postId,$authorId);
        $this->view->render(['success' => 'Like removed']);
        //echo json_encode(['success' => 'Like removed']);
    }

}