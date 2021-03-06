// Function prints the information about pressed keys
const printPressedKeysData = () => {
    let keysData_wrapper = document.createElement('div')
    keysData_wrapper.className = 'keysData'
    content.appendChild(keysData_wrapper)
    for (let key of keys) {
        if (key.press_count > 0) {
            let unit = document.createElement('div')
            unit.innerHTML = `<span class="keyUnit">${String.fromCharCode(key.code)}(code:${key.code}) - ${key.press_count} clicked</span>`
            keysData_wrapper.appendChild(unit)
        }
    }
}

module.exports = printPressedKeysData