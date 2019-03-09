const { app, BrowserWindow } = require('electron')

// Callbacks

const getCPU_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getCPU', arg)  
}

function createWindow () {
    let win = new BrowserWindow({ width: 1000, height: 750, show: false })

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('show', () => {
        getCPU_DATA()
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