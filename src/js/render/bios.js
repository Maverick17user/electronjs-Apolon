// Callback function to get Bios data at the screen
const getBios_DATA = () => {
    document.querySelectorAll('li')[1].onclick = () => {
        makeContentReadyToPrint()

        createTitle('Bios information', header)

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
}

// Get a message by this render process to print data 
ipcRenderer.on('getBios', (event, arg) => getBios_DATA(arg))