<?php
class Domains_User extends Domains_Base {
    public function __construct(array $data)
    {
        $this->data = [
            "id" => null,
            "username" => null,
            "password" => null,
            "description" => null,
            "image" => null
        ];
        parent::__construct($data);
    }
    //Mal schauen ob man das wirklich braucht
    public function toArray(): array {
        return get_object_vars($this)["data"]; //WHY PHP WHY?????
    }
}
