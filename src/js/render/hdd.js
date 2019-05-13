// Callback function to get HDD & HDD Blocks data at the screen
const getDiscks_DATA = () => {
    document.querySelectorAll('li')[4].onclick = () => {
        makeContentReadyToPrint()
        loading('start')

        createTitle('HDD && HDD Blocks', header)

        // Get HDD data
        si.diskLayout() 
            .then(data => {
                createTitle('HDD data', content, 'hr')
                data.forEach(element => {
                    toArrays(element).forEach(element => deepOutput(element, content))
                })
            })
            .then(() => {
                // Get HDD blocks data
                si.blockDevices()
                    .then(data => {
                        createTitle('HDD Blocks', content, 'hr')
                        data.forEach(obj => {
                            toArrays(obj).forEach(element => deepOutput(element, content))
                        })
                    })
            })
            .then(() => loading('stop'))
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('getHDD', (event, arg) => getDiscks_DATA(arg))