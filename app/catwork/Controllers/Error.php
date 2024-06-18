<?php

class Controllers_Error extends Controllers_Base
{
    public function error($exception)
    {
        if ($exception instanceof Exceptions_Statuscode) {
            http_response_code($exception->statuscode);
        } else {
            http_response_code(500);
        }
        $this->view->render($exception);
    }
}