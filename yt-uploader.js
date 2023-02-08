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
        do {
            t_ipt = await wait_for('.input-container.title #textbox');
            t_ipt.focus();
            cmd().copy_vdata_to_clipboard("title").paste().exec();
            t_ipt.focus();
            await sleep(5);
        } while(t_ipt.innerHTML !== vdata.title);

        // focus description input and paste description
        do{
            d_ipt = await wait_for("#description-container #textbox");
            d_ipt.focus();
            cmd().copy_vdata_to_clipboard("description").paste().exec();
            d_ipt.focus();
            await sleep(5);
        } while(!d_ipt.innerText.trim().length);

        // mark radiobutton "video not made for kids"
        not_kids_radio = await wait_for("[name=VIDEO_MADE_FOR_KIDS_NOT_MFK] #radioContainer");
        not_kids_radio.click();

        // LANG (todo)
        // find "MOSTRAR MAIS" + Dropdown Icon (click) THEN:
        // [...document.querySelectorAll('.item-text')].filter(it => it.innerHTML == 'Aramaico')[0].click()
    }
}

main();

