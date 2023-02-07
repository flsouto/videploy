document.body.style.backgroundColor = 'black';

async function yt_upload(){
    const yt = window.open("https://youtube.com/","_blank");
    await open_console();
    await copy_script_to_clipboard("yt-uploader.js");
    await paste_and_enter();
}

async function main(){
    await open_console();
    await yt_upload();
}

main();
