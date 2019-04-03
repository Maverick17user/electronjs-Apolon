const makeContentReadyToPrint = () => {
    if(header.childNodes.length > 0) {
        header.childNodes.forEach(element => element.remove());
    }
    const removeContent = () => {
        if(content.childNodes.length > 0) {
            content.childNodes.forEach(element => element.remove());
            removeContent()
        }
    }
    removeContent()
}

module.exports = makeContentReadyToPrint