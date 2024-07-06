<?php
class Exceptions_BadRequest extends Exceptions_Statuscode {
    public function __construct(string $message = "", int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct(400, $message, $code, $previous);
    }
}