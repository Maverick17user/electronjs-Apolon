// Create a title
const createTitle = (name, context, isHR) => {
    let title = document.createElement("h5")

    title.className = "title"
    title.innerHTML = name
    context.appendChild(title)

    if (isHR) {
        const hr = document.createElement('hr')
        hr.setAttribute('color', '#9FA6B7')
        context.appendChild(hr)
    }
}

module.exports = createTitle