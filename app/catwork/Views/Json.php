<?php

class Views_Json extends Views_Base
{
    public function render($data)
    {
        header('Content-Type: application/json; charset=utf-8');
        $json = json_encode($data);
        echo preg_replace('/,\s*"[^"]+":null|"[^"]+":null,?/', '', $json);
        exit;
    }

}