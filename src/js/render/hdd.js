// Callback function to get HDD & HDD Blocks data at the screen
const getDiscks_DATA = () => {
    document.querySelectorAll('li')[4].onclick = () => {
        makeContentReadyToPrint()
        loading('start')

        createTitle('HDD && HDD Blocks information', header)

        // Get HDD data
        si.diskLayout()
            .then(data => toArrays(data[0]).forEach(element => deepOutput(element, content)))
                .then(() => {
                    // Get HDD blocks data
                    si.blockDevices()
                    .then(data => data.forEach(obj => toArrays(obj).forEach(element => deepOutput(element, content))))
                        .then(() => loading('stop'))
                    .catch(error => console.error(error))
                })
            .catch(error => console.error(error))
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('getHDD', (event, arg) => getDiscks_DATA(arg))