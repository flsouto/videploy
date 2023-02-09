document.body.style.backgroundColor = 'black';

async function open_page(url, inject_script){
    const page = window.open(url,"_blank");
    await cmd()
        .open_console()
        .copy_script_to_clipboard(inject_script)
        .paste()
        .enter()
        .exec()
    return page;
}

async function yt_upload(){
    const url = "https://studio.youtube.com/channel/__YTCHANNEL__/videos/upload?d=ud";
    const page = await open_page(url, "yt-uploader.js");
}

async function yt_check(){
    const url = "https://studio.youtube.com/channel/UCOJZp425HSWUGPjod2OIbsA/videos/upload";
    const page = await open_page(url, "yt-checker.js");
}

async function main(){
    await cmd().open_console().exec();
    //await yt_upload();
    await yt_check();
}

main();
