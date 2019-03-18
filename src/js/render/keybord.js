// Callback function to get pressed keys data at the screen
const getKeys_DATA = () => {
    createTitle('Pressed keys information', content)

    // Get pressed keys data
    document.querySelector('button').addEventListener('click', e => {
        if(document.body.contains(document.querySelector('div.keysData')))  {
            document.querySelector('div.keysData').remove()
        }
        printPressedKeysData()
    })
}

// Get a message by this render process to print data 
ipcRenderer.on('getKeys', (event, arg) => getKeys_DATA(arg))

  