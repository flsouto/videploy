<?php

$key = $argv[1]??'';
if(empty($key)) die("Usage: cmd <KEY>\n");

$sdir = __DIR__."/stage/";
$stage = glob("$sdir*.json");
if(empty($stage)) die("No json files found on stage\n");

$data = json_decode(file_get_contents($stage[0]),true);

if(!isset($data[$key])) die("vdata missing key: $key\n");

echo $data[$key];
