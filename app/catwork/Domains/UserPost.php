<?php

class Domains_UserPost extends Domains_Base {

    public function __construct(array $data) {
        $this->data = [
            "id" => null,
            "author_id" => null,
            "user_name" => null,
            "title" => null,
            "description" => null,
            "image" => null,
            "liked_by" => null,
            "timestamp" => null];
        parent::__construct($data);
    }

}