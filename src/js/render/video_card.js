// Callback function to get VideoCard data at the screen
const getVideoCard_DATA = () => {
    document.querySelectorAll('li')[3].onclick = () => {
        makeContentReadyToPrint()
        loading('start')

        createTitle('VideoCard information', header)

        // // Get VideoCard data
        si.graphics()
            .then(data => toArrays(data).forEach(element => deepOutput(element, content)))
                .then(() => loading('stop'))
            .catch(error => console.error(error))
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('getVideoCard', (event, arg) => getVideoCard_DATA(arg))