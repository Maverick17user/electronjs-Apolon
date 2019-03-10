// Callback function to get HDD data at the screen
const getHDD_DATA = () => {
    createTitle('HDD information', content)

    // // Get HDD data
    si.diskLayout()
        .then(data => toArrays(data[0]).forEach(element => deepOutput(element, content)))
        .catch(error => console.error(error))
}

// Get a message by this render process to print data 
ipcRenderer.on('getHDD', (event, arg) => getHDD_DATA(arg))