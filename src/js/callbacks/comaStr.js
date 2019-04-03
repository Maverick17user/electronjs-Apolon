// Function, what converts string to string,
// what each word separated by comas.
// Print the result at the document
const stringfullDataOutput = (name, arrayedStr, content) => {
    const comaString = name + arrayedStr.split(' ').join(', ')
    let span = document.createElement("span")
    span.className = "data_element"
    span.innerHTML = comaString
    content.appendChild(span)
}

module.exports = stringfullDataOutput