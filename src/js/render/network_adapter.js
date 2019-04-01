// Callback function to get NetworkAdapter data at the screen
const getNetworkAdapter_DATA = () => {
    createTitle('NetworkAdapter information', content)

    // // Get NetworkAdapter data
    si.networkInterfaces()
        .then(data => toArrays(data[0]).forEach(element => deepOutput(element, content)))
        .catch(error => console.error(error))
}

// Get a message by this render process to print data 
ipcRenderer.on('getNetworkAdapter', (event, arg) => getNetworkAdapter_DATA(arg))