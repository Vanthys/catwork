<?php
class Exceptions_NotFound extends Exceptions_Statuscode {
    public function __construct(string $message = "", int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct(404, $message, $code, $previous);
    }
}