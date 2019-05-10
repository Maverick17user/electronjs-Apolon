// Callback function to get processes data at the screen
const getProcesses_DATA = () => {
    document.querySelectorAll('li')[7].onclick = () => {
        makeContentReadyToPrint()
        loading('start')

        createTitle('Active processes information', header)

        // Get processes data
        si.processes()
            .then(data => {
                const processes = data.list

                delete data.list

                toArrays(data).forEach(element => deepOutput(element, content))
                outputProcessDataBeauty(processes)
            })
                .then(() => loading('stop'))
            .catch(error => console.error(error))
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('getProcesses', (event, arg) => getProcesses_DATA(arg))