// Callback function to get processes data at the screen
const getProcesses_DATA = () => {
    createTitle('Active processes information', content)
    
    // Get processes data
    si.processes()
        .then(data => toArrays(data).forEach(element => deepOutput(element, content)))
        .catch(error => console.error(error))
}

// Get a message by this render process to print data 
ipcRenderer.on('getProcesses', (event, arg) => getProcesses_DATA(arg))