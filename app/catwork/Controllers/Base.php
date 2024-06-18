<?php

abstract class Controllers_Base {
    protected array $params;
    protected Views_Base $view;

    public function __construct(Views_Base $view, array $params) {
        $this->view = $view;
        $this->params = $params;
    }
}