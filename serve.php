<?php

$port = $argv[1];
if(empty($port)||!ctype_digit($port)){
    die("Usage: cmd <PORT>");
}

file_put_contents(__DIR__."/port", $port);
passthru("php -S localhost:$port");
