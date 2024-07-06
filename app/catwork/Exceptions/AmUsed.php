<?php
class Exceptions_AmUsed extends Exceptions_Statuscode {
    public function __construct(string $message = "", int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct(426, $message, $code, $previous);
    }
}