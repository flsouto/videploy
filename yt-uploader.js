
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

        // head to step#3 and check public
        (await wait_for('#step-badge-3')).click();
        (await wait_for("[name=PUBLIC]")).click();
        (await wait_for("#done-button")).click();

        // LANG (todo)
        // find "MOSTRAR MAIS" + Dropdown Icon (click) THEN:
        // [...document.querySelectorAll('.item-text')].filter(it => it.innerHTML == 'Aramaico')[0].click()
    }
}

main();

