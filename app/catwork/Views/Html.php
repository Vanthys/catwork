<?php

class Views_Html extends Views_Base
{
    public function render($data)
    {
        if (is_array($data)) {
            $template = "table.phtml";
        } else {
            $template = "object.phtml";
        }

        if (is_readable(dirname(__FILE__) . "/templates/" . strtolower($this->resource_name) . "/" . $template)) {
            $template = strtolower($this->resource_name) . "/" . $template;
        }

        if ($data instanceof Exception) {
            $template = "error.phtml";
        }

        include "templates/" . $template;
        exit;
    }

}