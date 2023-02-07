document.body.style.backgroundColor = 'black';

async function yt_upload(){
    const url = "https://studio.youtube.com/channel/__YTCHANNEL__/videos/upload?d=ud";
    const yt = window.open(url,"_blank");
    await cmd()
        .open_console()
        .copy_script_to_clipboard("yt-uploader.js")
        .paste()
        .enter()
        .exec()
}

async function main(){
    await cmd().open_console().exec();
    await yt_upload();
}

main();
