<?php

abstract class Views_Base {

    protected $resource_name;
    protected $params;

    public function __construct($resource_name, $params)
    {
        $this->resource_name = $resource_name;
        $this->params = $params;
    }

    public abstract function render($data);
}