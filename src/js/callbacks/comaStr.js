// Function, what converts string to string,
// what each word separated by comas.
// Print the result at the document
const stringfullDataOutput = (name, arrayedStr, content) => {
    let span = document.createElement("span")
    span.className = "data_element"
    span.innerHTML = `<b>${name}:</b> <span style="color: #1CA8DD">${arrayedStr.split(' ').join(', ')}</span>`
    content.appendChild(span)
}

module.exports = stringfullDataOutput