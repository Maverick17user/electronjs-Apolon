// Function, what converts string to string,
// what each word separated by comas.
// Print the result at the document
const stringfullDataOutput = (name, arrayedStr, content) => {
    const comaString = name + arrayedStr.split(' ').join(', ')
    let p = document.createElement("p")
    p.className = "data_element"
    p.innerHTML = comaString
    content.appendChild(p)
}

module.exports = stringfullDataOutput