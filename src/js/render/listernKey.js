// Listerning key-pressing...
const listernKey = () => {
    document.addEventListener('keydown', event => {
        const keyCode = event.keyCode
        let keyObj = binarySearch(keyCode, keys[0].code, keys[keys.length-1].code)
        keyObj.press_count += 1
        console.log(keyObj.press_count);
    })
}

// Get a message by this render process to start key clicks handling 
ipcRenderer.on('handleKeys', (event, arg) => listernKey(arg))