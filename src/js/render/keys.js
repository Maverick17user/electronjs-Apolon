// Callback function to get keys data at the screen
const getKeys_DATA = () => {
    createTitle('Keys information', content)

    // // Get keys data
    keysDetected()
    // si.diskLayout()
    //     .then(data => toArrays(data[0]).forEach(element => deepOutput(element, content)))
    //     .catch(error => console.error(error))
}

// Get a message by this render process to print data 
ipcRenderer.on('getKeys', (event, arg) => getKeys_DATA(arg))