// Manufacture function, that creates 'keys'
// datastructure [{},{}...] to store 
// the initial data about keybord keys pressing state
const buildInitial_KeyData = () => {
    let data = []

    // Object-manufacturing
    class KeyStruct {
      constructor(code, press_count) {
        this.code = code
        this.press_count = press_count
      }
    }
    // Fill the array by manufacturing instances
    for (let i = 8; i < 223; i++) {
      data.push(new KeyStruct(Number(i), Number(0)))
    }
    
    return data
}

module.exports = buildInitial_KeyData