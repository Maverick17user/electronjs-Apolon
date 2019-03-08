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
    // console.log(typeof si.cpu().voltage);
    // Get CPU data
    si.cpu()
        .then(data => {
            let arraysLike_data = toArrays(data)
            arraysLike_data.forEach(element => { 
                deepOutput(element, content)    
            })
        })
        .catch(error => console.error(error));

    // Function, what converts object data structure
    // to lots of small arrays [key, value]
    toArrays = obj => Object.entries(obj)

    //  Function, what converts object data structure
    // to lots of small arrays [key, value]
    deepOutput = (data_element, content) => {
        if(!(data_element[1].length === 0)) {
            if(typeof data_element[1] === 'object') {
                let data = toArrays(data_element[1])
                data.forEach(element => {
                    deepOutput(element, content) 
                });   
            } else {
                let p = document.createElement("p")
                const upperLeterName = data_element[0].slice(0,1).toUpperCase() + data_element[0].slice(1)
                p.className = "data_element"
                p.innerHTML = `${upperLeterName}: ${data_element[1]}`
                content.appendChild(p)
            } 
        }       
    }
}

// Get a message by this render process to print data 
ipcRenderer.on('getCPU', (event, arg) => getCPU_DATA(arg))