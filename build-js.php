<?php

$file = $argv[1]??null;

if(empty($file)||!file_exists($file)){
    die("File not found: $file\n");
}

ob_start();
echo file_get_contents(__DIR__."/utils.js");
echo file_get_contents($file);
$js = ob_get_clean();
$port = file_get_contents(__DIR__."/port");
$js = str_replace("__BASEURL__","localhost:$port", $js);
echo $js;
