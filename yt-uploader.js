window.wait_for = async(selector, wait=3, attempts=10) => {
    el = null;
    for(let i=0; i<attempts; i++){
        el = document.querySelector(selector);
        if(el) return el;
        else await sleep(wait);
    }
    console.error(`wait_for ${selector} never got an element after ${attempts} attempts`);
}


main = async() => {

    const btn = await wait_for('#select-files-button .ytcp-button.label');
    if(btn){
        // open upload dialog
        btn.click();
        await sleep(2);
        // select file from picker
        cmd().enter().exec();
        // focus input and paste title
        ipt = await wait_for('.input-container.title #textbox');
        ipt.focus();
        cmd().copy_vdata_to_clipboard("title").paste().exec();
        ipt.focus();

        // LANG (todo)
        // find "MOSTRAR MAIS" + Dropdown Icon (click) THEN:
        // [...document.querySelectorAll('.item-text')].filter(it => it.innerHTML == 'Aramaico')[0].click()
    }
}

main();

