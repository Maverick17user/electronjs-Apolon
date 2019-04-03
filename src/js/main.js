const { app, BrowserWindow } = require('electron')

// Callbacks

const listernKey = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('handleKeys', arg)  
}

const getCPU_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getCPU', arg)  
}

const getHDD_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getHDD', arg)  
}

const getDiscks_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getDiscks', arg)  
}

const getProcesses_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getProcesses', arg)  
}

// ============= VUS's ==================

const getBios_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getBios', arg)  
}

const getMotherBoard_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getMotherBoard', arg)  
}

const getVideoCard_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getVideoCard', arg)  
}

const getNetworkAdapter_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getNetworkAdapter', arg)  
}

const getKeys_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getKeys', arg)  
}

function createWindow () {
    let win = new BrowserWindow({ width: 1000, height: 750, show: false })

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('show', () => {
        // listernKey()

        // --- MAX TASKS ---
        getCPU_DATA()
        getHDD_DATA()
        getDiscks_DATA()
        getProcesses_DATA()

        // --- Vasilich TASKS ---
        getBios_DATA()
        getVideoCard_DATA()
        getMotherBoard_DATA()
        getNetworkAdapter_DATA()
        // getKeys_DATA()
    })

    win.loadFile('src/views/main.html')

    win.webContents.openDevTools()

    win.on('closed', () => {
      win = null
    })
}

app.on('ready', createWindow)

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
