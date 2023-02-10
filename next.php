<?php

$qdir = __DIR__."/queue/";
$file = glob("$qdir*.json")[0] ?? null;

if(empty($file)) die();

$data = json_decode($json=file_get_contents($file),true);

$sdir = __DIR__."/stage/";
$ddir = __DIR__."/deployed/";
$conf = require(__DIR__."/config.php");
$udir = "/home/{$conf['USER']}/videploy/";

shell_exec("mkdir $ddir 2>/dev/null");
shell_exec("mv $sdir*.json $ddir 2>/dev/null; rm $sdir -R 2>/dev/null; mkdir $sdir");
shell_exec("rm $udir*.{mp4,mkv} 2>/dev/null");
shell_exec("mv $file $sdir && cp {$data['path']} /home/{$conf['USER']}/videploy/");

$vdata = "window.vdata = $json;";
file_put_contents(__DIR__."/vdata.js", $vdata);

echo $data['target'];
