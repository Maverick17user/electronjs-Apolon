const { app, BrowserWindow } = require('electron')
const mongoose = require('mongoose');
const HardwareData = require('./models/fullHard')
const config = require('./db');
const ipc = require('electron').ipcMain;

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

const getProcesses_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('getProcesses', arg)  
}

const postFullHardwareDataInDB = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.webContents.send('postFullHard', arg)  
}

ipc.on('postInDB', (event, hardData) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()

    const userFullHard = new HardwareData({
        user: hardData.user,
        cpu: hardData.cpu,
        bios: hardData.bios,
        baseBoard: hardData.baseBoard,
        gpu: hardData.gpu,
        hdd: hardData.hdd,
        hddBlocks: hardData.hddBlocks,
        networkInterface: hardData.networkInterface,
        pressedKeys: hardData.pressedKeys,
        processes: hardData.processes
    })

    // Find data by user name combo
    HardwareData.findOne(
        {user: userFullHard.user},
    )
    .then(data => {
        if(data) { 
            // Update current user's MongoDB document 
            HardwareData.findOneAndUpdate(
                {_id: data._id},
                {$set: {userFullHard}}
            )
            focusedWindow.webContents.send('updateDoc')
        } else {
            // Save user data as new MongoDB document
            userFullHard.save()
            .then(() => {
                focusedWindow.webContents.send('addDoc')
            })
        }
    })
    .catch(err => console.log(err))
})

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

mongoose.set('useFindAndModify', false);

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

function createWindow () {      
    let win = new BrowserWindow({ width: 4000, height: 2500, show: false })
    win.once('ready-to-show', () => {
        win.show()
        win.maximize()
    })

    win.on('show', () => {
        listernKey()

        // --- MAX TASKS ---
        getCPU_DATA()
        getHDD_DATA()
        getProcesses_DATA()
        postFullHardwareDataInDB()

        // --- Vasiliy TASKS ---
        getBios_DATA()
        getVideoCard_DATA()
        getMotherBoard_DATA()
        getNetworkAdapter_DATA()
        getKeys_DATA()
    })

    win.loadFile('src/views/main.html')

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
