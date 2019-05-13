const { app, BrowserWindow } = require('electron')
const mongoose = require('mongoose');
const HardwareData = require('./models/fullHard')
const config = require('./db');
const ipc = require('electron').ipcMain;
const si = require('systeminformation')

// Callbacks
const listernKey = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('handleKeys', arg)  
}

const listernMouse = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('mouseListern', arg)  
}

const getCPU_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('getCPU', arg)  
}

const getHDD_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('getHDD', arg)  
}

const getProcesses_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('getProcesses', arg)  
}

const postFullHardwareDataInDB = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('postFullHard', arg)  
}

const getTime_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('get_time', arg)  
}

ipc.on('postInDB', (event, hardData) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()

    const all = {
        user: hardData.user,
        cpu: hardData.cpu,
        bios: hardData.bios,
        baseBoard: hardData.baseBoard,
        gpu: hardData.gpu,
        hdd: hardData.hdd,
        hddBlocks: hardData.hddBlocks,
        devices: hardData.devices,
        networkInterface: hardData.networkInterface,
        processes: hardData.processes,
        timeANDusers: hardData.timeANDusers
    }

    const userFullHard = new HardwareData(all)

    // Find data by user name combo
    HardwareData.findOne(
        {user: userFullHard.user},
    )
    .then(data => {
        if(data) { 
            // Update current user's MongoDB document 
            HardwareData.findOneAndUpdate(
                {_id: data._id},
                {$set: all},
                (error, doc) => {
                    if (error) {
                        alert("Something wrong when updating data!");
                    }
                }
            )
            focusedWindow.send('updateDoc')
        } else {
            // Save user data as new MongoDB document
            userFullHard.save()
            .then(() => {
                focusedWindow.send('addDoc')
            })
        }
    })
    .catch(err => console.log(err))
})

const getBios_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('getBios', arg)  
}

const getMotherBoard_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('getMotherBoard', arg)  
}

const getVideoCard_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('getVideoCard', arg)  
}

const getNetworkAdapter_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('getNetworkAdapter', arg)  
}

const getDevices_DATA = (arg) => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send('getDevices', arg)  
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

    // win.openDevTools()   

    win.loadFile('src/views/main.html')

    win.on('show', () => {
        setTimeout(() => {
            listernKey()
            listernMouse()
    
            getCPU_DATA()
            getHDD_DATA()
            getProcesses_DATA()
            postFullHardwareDataInDB()
            getBios_DATA()
            getVideoCard_DATA()
            getMotherBoard_DATA()
            getNetworkAdapter_DATA()
            getDevices_DATA()
            getTime_DATA()
        }, 500)
    })

    win.on('closed', () => {
      win = null
    })
}

app.on('ready', () => createWindow())
