<?php

class Domains_Post extends Domains_Base
{
    public function __construct(array $data)
    {
        $this->data = [
            "id" => null,
            "author_id" => null,
            "title" => null,
            "description" => null,
            "image" => null,
            "liked_by" => [],
            "timestamp" => null];
        parent::__construct($data);
    }
}