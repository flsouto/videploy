main = async() => {
    const row = await wait_for('ytcp-video-row[role=row]');
    if(row.innerText.match(vdata.title) && row.innerText.match(/P[úu]blic/)){
        exec("php mvstage.php deployed");
    } else {
        exec("php mvstage.php queue");
    }
}

main();
