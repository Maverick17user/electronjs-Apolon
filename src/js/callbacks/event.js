// Function...
const keysDetected = () => {
    document.addEventListener('keydown', function (event) {
        console.log(event.which)
      })
    
}

module.exports = keysDetected
