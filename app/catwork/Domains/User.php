<?php
class Domains_User extends Domains_Base {
    public function __construct(array $data)
    {
        $this->data = ["id" => null, "username" => null, "password" => null];
        parent::__construct($data);
    }
}
