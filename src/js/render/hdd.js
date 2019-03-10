// Callback function to get HDD data at the screen
const getHDD_DATA = () => {
    // Create a title
    const content = document.querySelector('div.content')
    let titleCPU = document.createElement("h1")
    titleCPU.className = "title"
    titleCPU.innerHTML = `HDD information`
    content.appendChild(titleCPU)

    // // Get HDD data
    si.mem()
        .then(data => {
            toArrays(data).forEach(element => deepOutput(element, content))
            si.memLayout()
                .then(data => deepOutput(toArrays(data[0])[4], content))
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error))

    // // Function, what converts object data structure
    // // to lots of small arrays [key, value]
    toArrays = obj => Object.entries(obj)

    // // Function, what converts object data structure
    // // to lots of small arrays [key, value]
    deepOutput = (data_element, content, name) => {
        if(!(data_element[1].length === 0) && data_element[1] !== 0) {
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
}

// Get a message by this render process to print data 
ipcRenderer.on('getHDD', (event, arg) => getHDD_DATA(arg))