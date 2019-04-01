const { ipcRenderer } = require('electron')
const si = require('systeminformation')

const require_file_fromJS = file => require("modules/../../src/js/" + file)

const createTitle = require_file_fromJS("callbacks/title")
const toArrays = require_file_fromJS("callbacks/toArr")
const deepOutput = require_file_fromJS("callbacks/deepOutput")
const stringfullDataOutput = require_file_fromJS("callbacks/comaStr")
const buildInitial_KeyData = require_file_fromJS("callbacks/initialKeys")
const binarySearch = require_file_fromJS("callbacks/binarySearch")
const printPressedKeysData = require_file_fromJS("callbacks/printKeys")

const content = document.querySelector('div.content')

// Initial keys's data structure [{},{},{}...]
let keys = buildInitial_KeyData()