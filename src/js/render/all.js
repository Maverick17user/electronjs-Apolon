const ipc = require('electron').ipcRenderer;

// Callback function to post full hardware data into remote db
const postFullHardwareDataInDB = () => {
    document.querySelectorAll('li')[9].onclick = () => {
        makeContentReadyToPrint()

        loading('start')

        createTitle('Full hardware data • Post into remote data base', header)
        // os.userInfo()
        let compareData = new Promise(async (resolve, reject) => {
            Object.assign(dataForDB, {user: os.hostname() + '-' + os.userInfo().username})
            await si.cpu().then(data => Object.assign(dataForDB, {cpu: data}))
            await si.bios().then(data => Object.assign(dataForDB, {bios: data}))
            await si.baseboard().then(data => Object.assign(dataForDB, {baseBoard: data}))
            await si.graphics().then(data => Object.assign(dataForDB, {gpu: data}))
            await si.diskLayout().then(data => Object.assign(dataForDB, {hdd: data}))
            await si.blockDevices().then(data => Object.assign(dataForDB, {hddBlocks: data}))
            await si.graphics().then(data => Object.assign(dataForDB, {devices: {
                pressedKeys: keys, 
                packedMouseData: {
                    currentLeftMouseCount,
                    currentRightMouseCount,
                    currentAllMouseCount
                },
                graphicsDevices: data
            }}))
            await si.networkInterfaces().then(data => Object.assign(dataForDB, {networkInterface: data}))
            await si.processes().then(data => Object.assign(dataForDB, {processes: data}))
            await si.users().then(data => Object.assign(dataForDB, {timeANDusers: {
                allOnlineUsersData: data,
                os_startedAt: uptime().toLocaleString(),
                uptimeInSecondsForCerUser: os.uptime() + ' sec.'
            }}))

            resolve(dataForDB)
        });

        compareData.then(hardData => {
            ipc.send('postInDB', hardData)      
        })

        ipc.on('addDoc', (e) => {
            loading('stop')

            let section = document.createElement('section')
            section.className = 'addDoc'
            section.innerHTML = `<p>Data successfully saved!</p>`
            content.appendChild(section)
        })  

        ipc.on('updateDoc', (e) => {
            loading('stop')

            let section = document.createElement('section')
            section.className = 'updateDoc'
            section.innerHTML = `<p>Data successfully updated!</p>`
            content.appendChild(section)
        }) 
    }
}

// Get a message by this render process to post data 
ipcRenderer.on('postFullHard', (event, arg) => postFullHardwareDataInDB(arg))