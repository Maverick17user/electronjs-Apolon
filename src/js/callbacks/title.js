// Create a title
const createTitle = (name, context) => {
    let titleCPU = document.createElement("h5")

    titleCPU.className = "title"
    titleCPU.innerHTML = name
    context.appendChild(titleCPU)
}

module.exports = createTitle