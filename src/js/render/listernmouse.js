// Listerning mouse key-pressing...
const listernMouse = () => {
    document.addEventListener("click", () => makeLeftCounter());
    document.addEventListener("contextmenu", () => makeRightCounter());
}

// Get a message by this render process to start mouse clicks handling 
ipcRenderer.on('mouseListern', (event, arg) => listernMouse(arg))

const makeLeftCounter = () => {
    currentLeftMouseCount++;
    makeAllCounter()
}

const makeRightCounter = () => {
    currentRightMouseCount++;
    makeAllCounter()
}

const makeAllCounter = () => {
    currentAllMouseCount = currentLeftMouseCount + currentRightMouseCount;
}