<?php

$moveto = $argv[1]??"";
if(empty($moveto)) die("Usage: cmd <TO_DIR>\n");

$sdir = __DIR__."/stage/";
$stage = glob("$sdir*.json");
if(empty($stage)) die("No json files found on stage\n");
$stage = $stage[0];

if(!is_dir($moveto)){
    mkdir($moveto, 0777);
}

rename($stage, $moveto."/".basename($stage));
if(file_exists($f=__DIR__."/vdata.js")){
    unlink($f);
}
