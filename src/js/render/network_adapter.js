// Callback function to get network interfaces data at the screen
const getNetworkAdapter_DATA = () => {
    document.querySelectorAll('li')[6].onclick = () => {
        makeContentReadyToPrint()
        loading('start')

        // Get Network interfaces data
        createTitle('Network interfaces', header)
        si.networkInterfaces()
            .then(data => {
                console.log(data)
                data.forEach(unit => {
                    toArrays(unit).forEach(element => deepOutput(element, content))
                });
            })
            .then(() => loading('stop'))
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('getNetworkAdapter', (event, arg) => getNetworkAdapter_DATA(arg))