// Callback function to get Bios data at the screen
const getBios_DATA = () => {
    createTitle('Bios information', content)

    // Get Bios data
    si.bios()
        .then(data => {
            toArrays(data).forEach(element => deepOutput(element, content))
            // Get system information data
            si.system()
                .then(data => toArrays(data).forEach(element => deepOutput(element, content)))
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
}

// Get a message by this render process to print data 
ipcRenderer.on('getBios', (event, arg) => getBios_DATA(arg))