const { ipcRenderer } = require('electron')
const si = require('systeminformation')

// Callback function to get CPU data at the screen
const getCPU_DATA = () => {
    // Create a title
    const content = document.querySelector('div.content')
    let titleCPU = document.createElement("h1")
    titleCPU.className = "title"
    titleCPU.innerHTML = `CPU information`
    content.appendChild(titleCPU)

    // Get CPU data
    si.cpu()
        .then(data => {
            toArrays(data).forEach(element => deepOutput(element, content))
            // Get CPU flags data
            si.cpuFlags()
                .then(data => stringfullDataOutput('CPU flags: ', data, content))
                .catch(error => console.error(error))
            // Get CPU cores speed data
            si.cpuCurrentspeed()
                .then(data => toArrays(data).forEach(element => deepOutput(element, content, 'Core speed')))
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error))

    // Function, what converts object data structure
    // to lots of small arrays [key, value]
    toArrays = obj => Object.entries(obj)

    // Function, what converts object data structure
    // to lots of small arrays [key, value]
    deepOutput = (data_element, content, name) => {
        if(!(data_element[1].length === 0)) {
            if(typeof data_element[1] === 'object') {
                toArrays(data_element[1]).forEach(element => deepOutput(element, content, name));   
            } else {
                const upperLeterName = (!name) 
                    ? data_element[0].slice(0,1).toUpperCase() + data_element[0].slice(1) 
                    : `${name} ${data_element[0]}`
                let p = document.createElement("p")
                p.className = "data_element"
                p.innerHTML = `${upperLeterName}: ${data_element[1]}`
                content.appendChild(p)
            } 
        }       
    }
   
    // Function, what converts string to string,
    // what each word separated by comas.
    // Print the result at the document
    stringfullDataOutput = (name, arrayedStr, content) => {
        const comaString = name + arrayedStr.split(' ').join(', ')
        let p = document.createElement("p")
        p.className = "data_element"
        p.innerHTML = comaString
        content.appendChild(p)
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('getCPU', (event, arg) => getCPU_DATA(arg))