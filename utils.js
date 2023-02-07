
window.exec = async (str) => {
    console.log("running command: "+str);
    const exec_url = (cmd) => "__BASEURL__/exec.php?cmd="+encodeURIComponent(cmd);
    try{
        const response = await fetch(exec_url(str));
        const output = await response.text();
        console.log("output: "+output);
        return output;
    } catch(e){
        if(e.message.match("Network")){
            console.log("CSP policy blocked exec via fetch. Using window.open fallback");
            const w = window.open( exec_url( "sleep 2 && " + str ), '_blank');
            setTimeout(() => w.close(), 1000);
            await sleep(2);
        }
    }
}

window.sleep = (seconds) => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000)
    });
}

window.cmd = () => {
    const chain = [];
    const self = {
        chain,
        merge(cmd){
            chain.push( ...cmd.chain );
            return self;
        },
        sleep(seconds){
            chain.push(`sleep ${seconds}`);
            return self
        },
        paste(){
            chain.push("xdotool key ctrl+v");
            return self;
        },
        enter(){
            chain.push("xdotool key enter");
            return self;
        },
        open_console(){
            chain.push("xdotool key ctrl+shift+k");
            return self.sleep(2);
        },
        copy_script_to_clipboard(script){
            chain.push("php build-js.php "+script+" | xclip -sel clip > /dev/null");
            return self;
        },
        async exec(){
            return await window.exec(chain.join(" && "));
        }
    };
    return self;
}
