const uptime = require('os-uptime');

// Callback function to get uptime data at the screen
const getTime_DATA = () => {
    document.querySelectorAll('li')[8].onclick = () => {
        makeContentReadyToPrint()
        loading('start')

        createTitle('Time data', header)

        // Get OS uptime in seconds
        createTitle('OS uptime', content)
        toArrays({                 
            StartedAt: uptime().toLocaleString(),
            UptimeInSeconds: os.uptime() + ' sec.'
        }).forEach(element => deepOutput(element, content))

        // Get online users data
        createTitle('Online users data', content)
        si.users().then(data => {
            if (data.length === 0) {
                toArrays({                 
                    Warning: "Apolon can't recognize online users :(",
                }).forEach(element => deepOutput(element, content))
            } else {
                data.forEach(elem => {
                    toArrays(elem).forEach(element => deepOutput(element, content))
                })
            }
        })
        .then(() => loading('stop'))
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('get_time', (event, arg) => getTime_DATA(arg))