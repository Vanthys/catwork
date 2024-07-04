<?php

class Utils_Dispatcher
{
    public function dispatch()
    {

        $url_elements = [];
        if (isset($_SERVER['PATH_INFO'])) {
            $url_elements = explode('/', $_SERVER['PATH_INFO']);
            // Your code using $pathInfo
        } else {
            //Show frontend code
            $html_file = file_get_contents(__DIR__ . '/../../index.html'); // Replace with your React app's index.html path
            echo $html_file;
            die();
        }

        $resource_type = $url_elements[1];

        $path_params = array_slice($url_elements, 2);


        $view_type = "Json";
        if (isset($_SERVER["HTTP_ACCEPT"])) {
            $view_type = str_contains( strtolower($_SERVER["HTTP_ACCEPT"]), "application/json") ? "Json" : "Html";
        }
        $view_type = "Views_" . $view_type;

        $view = new $view_type($resource_type, $path_params);

        try {
            $controller_name = "Controllers_" . $resource_type;
            $controller_instance = new $controller_name($view, $path_params);

            $verb = strtolower($_SERVER['REQUEST_METHOD']);

            if ($verb === "put" || $verb === "post") {
                $input = file_get_contents("php://input");
                $data = "";
                if ($input != null){
                    $data = json_decode($input, true);
                }
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception('Invalid JSON');
                }
                $_POST = $data;
            }
            /*
            if ($verb === "put") {
                 parse_str(file_get_contents("php://input"),$GLOBALS["_PUT"]);
            }
            */
            $controller_instance->$verb();

        } catch (Exception $e) {
            echo $e->getMessage();
            $controller = new Controllers_Error($view, $path_params);
            $controller->error($e);
        }
    }
}