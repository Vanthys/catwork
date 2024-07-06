<?php

class Controllers_Post extends Controllers_Base
{

    private Models_Post $post_model;
    private Models_User $user_model;

    public function __construct(Views_Base $view, array $params)
    {
        parent::__construct($view, $params);
        $this->post_model = new Models_Post();
        $this->user_model = new Models_User();
    }


    public function get()
    {
        if ($this->params) {
            $data = $this->post_model->findById($this->params[0]);
        } else {
            $data = $this->post_model->findAll();
        }
        $this->view->render($data);
    }

    /**
     * @throws Exceptions_BadRequest
     */
    public function post()
    {

        Utils_Login::check_session_or_error();
        $data = $_POST;
        if (empty($data)) {
           throw new Exceptions_BadRequest("invalid parameters");
        }

        //here we need to set $data->timestamp to the current server  datetime()
        $data['timestamp'] = date('Y-m-d H:i:s');

        $obj = new Domains_Post($data);


        $user = $this->user_model->getUserByToken($_SESSION["user"]);

        if ($user->id != $data["author_id"]) {
            throw new Exceptions_BadRequest("You are not who you say you are");
        }

        $newPost = $this->post_model->insert($obj);

        //TODO, how can I send specific response codes
        http_response_code(301);
        echo json_encode($newPost);

        die();
    }
}