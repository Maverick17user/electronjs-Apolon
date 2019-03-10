// // Function, what converts object data structure
// // to lots of small arrays [key, value]
const deepOutput = (data_element, content, name) => {
    if(data_element[1].length !== 0 && String(data_element[1]).indexOf('�') == -1) {
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

module.exports = deepOutput