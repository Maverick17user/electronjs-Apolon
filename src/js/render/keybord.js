// Callback function to get pressed keys data at the screen
const getKeys_DATA = () => {
    document.querySelectorAll('li')[5].onclick = () => {
        makeContentReadyToPrint()

        createTitle('Pressed keys information', header)

        // Get pressed keys data
        if (document.body.contains(document.querySelector('div.keysData'))) {
            document.querySelector('div.keysData').remove()
        }
        printPressedKeysData()
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('getKeys', (event, arg) => getKeys_DATA(arg))

