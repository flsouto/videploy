<?php

$port = $argv[1]??null;
if(empty($port)||!ctype_digit($port)){
    die("Usage: cmd <PORT>\n");
}

file_put_contents(__DIR__."/port", $port);
passthru("php -S localhost:$port");
