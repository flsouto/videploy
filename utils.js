window.exec = async (cmd) => {
    console.log("running command: "+cmd);
    const response = await fetch("http://__BASEURL__/exec.php?cmd="+encodeURIComponent(cmd))
    const output = await response.text();
    console.log("output: "+output);
    return output;
}

window.copy_script_to_clipboard = async(script) => {
    await exec("php build-js.php "+script+" | xclip -sel clip > /dev/null");
}

window.open_console = async() => {
    await exec("xdotool key ctrl+shift+k");
    await sleep(2);
}

window.paste = async() => {
    await exec("xdotool key ctrl+v");
}

window.paste_and_enter = async() => {
    await exec("xdotool key ctrl+v && xdotool key enter");
}

window.sleep = (seconds) => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000)
    });
}
