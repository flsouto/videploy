main = async() => {
    const row = await wait_for('ytcp-video-row[role=row]');
    alert(row.innerText);
}

main();
