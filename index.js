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

async function yt_upload(){
    const url = "https://studio.youtube.com/channel/__YTCHANNEL__/videos/upload?d=ud";
    await open_page(url, "yt-uploader.js");
}

async function yt_check(){
    const url = "https://studio.youtube.com/channel/UCOJZp425HSWUGPjod2OIbsA/videos/upload";
    await open_page(url, "yt-checker.js");
}

async function main(){
    if(page){
        page.close();
    };
    await cmd().open_console().exec();
    const stage = true; // todo
    if(!stage){
        await exec("php next.php");
        await yt_upload();
        setTimeout(main, 60 * 5 * 1000);
    } else {
        await yt_check();
        setTimeout(main, 30 * 1000);
    }
}


main();

