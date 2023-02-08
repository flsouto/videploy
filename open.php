<?php

$conf = require(__DIR__.'/config.php');
$port = file_get_contents(__DIR__."/port");
$dir =  "/home/{$conf['USER']}/videploy/";

passthru("sudo mkdir $dir 2>/dev/null; sudo chmod 777 $dir;");
passthru("sudo runuser -u {$conf['USER']} -- firefox localhost:{$port}");
