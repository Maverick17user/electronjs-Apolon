// Callback function to get VideoCard data at the screen
const getVideoCard_DATA = () => {
    createTitle('VideoCard information', content)

    // // Get VideoCard data
    si.graphics()
        .then(data => toArrays(data).forEach(element => deepOutput(element, content)))
        .catch(error => console.error(error))
}

// Get a message by this render process to print data 
ipcRenderer.on('getVideoCard', (event, arg) => getVideoCard_DATA(arg))