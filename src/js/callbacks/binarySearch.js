// This function compare the code of pressed keybord key
// with 'keys' data scructure unit (object) by common code value
const binarySearch = (targetPos, startPos, endPos) => {
  const middle = Math.floor((startPos + endPos) / 2)
  if (targetPos == middle || targetPos == (middle + 1)) {
    return keys[targetPos - 8]
  }
  else if (targetPos > middle) {
    return binarySearch(targetPos, middle, endPos);
  }
  else if (targetPos < middle) {
    return binarySearch(targetPos, startPos, middle);
  }
}

module.exports = binarySearch
