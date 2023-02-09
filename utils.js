
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
    const xclip = "xclip -sel clip > /dev/null";

    const self = {
        chain,
        merge(cmd){
            chain.push( ...cmd.chain );
            return self;
        },
        sleep(seconds){
            return self.add(`sleep ${seconds}`);
        },
        paste(){
            return self.add("xdotool key ctrl+v");
        },
        enter(){
            return self.add("xdotool key enter");
        },
        open_console(){
            return self.add("xdotool key ctrl+shift+k").sleep(2);
        },
        copy_string_to_clipboard(text){
            return self.add(`echo '${text}' | ${xclip}`);
        },
        copy_script_to_clipboard(script){
            return self.add(`php build-js.php ${script} | ${xclip}`);
        },
        copy_vdata_to_clipboard(key){
            return self.add(`php vdata.php ${key} | ${xclip}`);
        },
        add(str){
            chain.push(str);
            return self;
        },
        toString(){
            return chain.join(" && ");
        },
        async exec(){
            return await window.exec(String(self))
        }
    };
    return self;
}

window.wait_for = async(selector, wait=3, attempts=10) => {
    el = null;
    for(let i=0; i<attempts; i++){
        el = document.querySelector(selector);
        if(el) return el;
        else await sleep(wait);
    }
    console.error(`wait_for ${selector} never got an element after ${attempts} attempts`);
}
