// Callback function to get MotherBoard data at the screen
const getMotherBoard_DATA = () => {
    document.querySelectorAll('li')[2].onclick = () => {
        makeContentReadyToPrint()

        createTitle('MotherBoard information', header)

        // Get MotherBoard data
        si.baseboard()
            .then(data => {
                toArrays(data).forEach(element => deepOutput(element, content))
                // Get chassis data
                si.chassis()
                    .then(data => toArrays(data).forEach(element => deepOutput(element, content)))
                    .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('getMotherBoard', (event, arg) => getMotherBoard_DATA(arg))