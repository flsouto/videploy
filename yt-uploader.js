
main = async() => {

    btn = null
    while(!btn){
        btn = document.querySelector('#select-files-button .ytcp-button.label');
        if(!btn){
            await sleep(3);
        }
    }
    btn.click();
}

main();

