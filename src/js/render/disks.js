// Callback function to get HDD blocks data at the screen
const getDiscks_DATA = () => {
    createTitle('HDD Blocks information', content)
    
    // // Get HDD blocks data
    si.blockDevices()
        .then(data => data.forEach(obj => toArrays(obj).forEach(element => deepOutput(element, content))))
        .catch(error => console.error(error))
}

// Get a message by this render process to print data 
ipcRenderer.on('getDiscks', (event, arg) => getDiscks_DATA(arg))