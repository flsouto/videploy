<?php

$file = $argv[1]??null;

if(empty($file)||!file_exists($file)){
    die("File not found: $file\n");
}

ob_start();
if(file_exists($f=__DIR__."/vdata.js")){
    echo file_get_contents($f);
}
echo file_get_contents(__DIR__."/utils.js");
echo file_get_contents($file);
$js = ob_get_clean();
$port = file_get_contents(__DIR__."/port");
$conf = require('config.php');
$conf['BASEURL'] = "http://localhost:$port/";
foreach($conf as $k => $v){
    $js = str_replace("__{$k}__",$v, $js);
}

echo $js;


