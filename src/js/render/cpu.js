// Callback function to get CPU data at the screen
const getCPU_DATA = () => {
    createTitle('CPU information', content)

    // Get CPU data
    si.cpu()
        .then(data => {
            toArrays(data).forEach(element => deepOutput(element, content))
            // Get CPU flags data
            si.cpuFlags()
                .then(data => stringfullDataOutput('CPU flags: ', data, content))
                .catch(error => console.error(error))
            // Get CPU cores speed data
            si.cpuCurrentspeed()
                .then(data => toArrays(data).forEach(element => deepOutput(element, content, 'Core speed')))
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
}

// Get a message by this render process to print data 
ipcRenderer.on('getCPU', (event, arg) => getCPU_DATA(arg))