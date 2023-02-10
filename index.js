document.body.style.backgroundColor = 'black';

let page = null;

async function open_page(url, inject_script){
    page = window.open(url,"_blank");
    await cmd()
        .open_console()
        .copy_script_to_clipboard(inject_script)
        .paste()
        .enter()
        .exec()
}

const targets = {
    youtube: {
        async upload(){
            const url = "https://studio.youtube.com/channel/__YTCHANNEL__/videos/upload?d=ud";
            await open_page(url, "yt-uploader.js");
        },
        async check(){
            const url = "https://studio.youtube.com/channel/__YTCHANNEL__/videos/upload";
            await open_page(url, "yt-checker.js");
        }
    },
    instagram: {
        async upload(){},
        async check(){}
    }
}

async function main(){
    if(page){
        page.close();
    };
    await cmd().open_console().exec();
    const stage = await exec("ls stage");
    if(!stage){
        const target = await exec("php next.php");
        if(target){
            await targets[target].upload();
            setTimeout(main, 60 * 2 * 1000);
        } else {
            alert("No more targets!");
        }
    } else {
        const target = await exec("php vdata.php target");
        await targets[target].check();
        setTimeout(main, 30 * 1000);
    }
}


main();

