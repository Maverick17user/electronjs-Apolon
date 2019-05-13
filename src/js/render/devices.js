// Callback function to get Devices data at the screen
const getDevices_DATA = () => {
    document.querySelectorAll('li')[5].onclick = () => {
        makeContentReadyToPrint()
        loading('start')
        createTitle('Devices', header)

        // Get Monitor data
        si.graphics()
        .then(data => {
            createTitle('Monitor', content, 'hr')
            data.displays.forEach(displayUnit => {
                toArrays(displayUnit).forEach(element => deepOutput(element, content))
            })
            
            // Get keyboard and mouse usage data
            keybordData()
            mouseData()
        })
        .then(() => loading('stop'))
    }
}

const keybordData = () => {
    createTitle('Keybord usage', content, 'hr')

    printPressedKeysData()

    if (document.querySelector('div.keysData').childNodes.length === 0) {
        toArrays({
            PressedKeys: 'Any',
        }).forEach(element => deepOutput(element, content))
    }
} 

const mouseData = () => {
    createTitle('Mouse usage', content, 'hr')
    toArrays({
        LeftClicks: currentLeftMouseCount,
        RightClicks: currentRightMouseCount,
        AllClicks: currentAllMouseCount,
    }).forEach(element => deepOutput(element, content))
}

// Get a message by this render process to print data 
ipcRenderer.on('getDevices', (event, arg) => getDevices_DATA(arg))
