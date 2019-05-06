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
const makeContentReadyToPrint = require_file_fromJS("callbacks/isReadyToPrint")
const loading = require_file_fromJS("callbacks/loading")

const header = document.querySelector('header')
const content = document.querySelector('div.content')

// Initial keys's data structure [{},{},{}...]
let keys = buildInitial_KeyData()

const outputCoreSpeedBeauty = (upperLeterName, data_element) => {
    if (!document.body.contains(document.querySelector('div.graph-wrapper'))) {
        let wrap = document.createElement('div')
        wrap.style.width = '500px'
        wrap.style.height = '250px'
        wrap.className = 'graph-wrapper'
        content.appendChild(wrap)
        let wrapper = document.querySelector('div.graph-wrapper')
        {
            let canvas = document.createElement('CANVAS')
            canvas.setAttribute('id', 'eachCoreSpeed')
            canvas.setAttribute('id', 'cpu_cores_speed')
            wrapper.appendChild(canvas)

            var ctx = document.getElementById('cpu_cores_speed').getContext('2d');
            Chart.defaults.global.defaultFontColor = '#9FA6B7';
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Core 1', 'Core 2', 'Core 3', 'Core 4'],
                    datasets: [{
                        label: 'GHz',
                        backgroundColor: [
                            '#1CA8DD', '#007AE1', '#9F86FF',
                            '#1CA8DD', '#007AE1', '#9F86FF',
                            '#1CA8DD', '#007AE1', '#9F86FF',
                            '#1CA8DD', '#007AE1', '#9F86FF',
                            '#1CA8DD', '#007AE1', '#9F86FF'
                        ],
                        data: [3.29, 3.29, 3.29, 3.29],
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Cpu Cores speed',
                        fontColor: 'white',
                        fontSize: '20',
                        fontStyle: 'normal'
                    }
                }
            });
        }
        {
            let canvas = document.createElement('CANVAS')
            canvas.setAttribute('id', 'generalCoreSpeedData')
            canvas.setAttribute('id', 'cpu_gencores_speed')
            wrapper.appendChild(canvas)

            var ctx = document.getElementById('cpu_gencores_speed').getContext('2d');
            Chart.defaults.global.defaultFontColor = '#9FA6B7';
            var chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Min speed', 'Max speed', 'Avarage speed'],
                    datasets: [{
                        label: 'GHz',
                        backgroundColor: [
                            '#1CA8DD', '#007AE1', '#9F86FF',
                        ],
                        data: [3.29, 3.29, 3.29],
                        borderColor: '#2F323A'
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'General cores speed information',
                        fontColor: 'white',
                        fontSize: '20',
                        fontStyle: 'normal'
                    }
                }
            });
        }
    }
}

const outputProcessDataBeauty = allProcesses => {

    const minifyProcessesData = allProcesses.map((process, i) => {
        return {
            id: i+1,
            name: process.name,
            pcpu: process.pcpu,
            pid: process.pid,
            parentPid: process.parentPid,
            started: process.started
        }
    })
    
    minifyProcessesData.forEach(process => {

        const processEntries = toArrays(process)

        let section = document.createElement("section")
        section.className = "process_section"

        processEntries.forEach(entrie => {
            const upperLeterName = entrie[0].slice(0,1).toUpperCase() + entrie[0].slice(1)

            let span = document.createElement("span")
            span.className = "data_element"
            span.innerHTML = `<b>${upperLeterName}:</b><span style="color: #1CA8DD">${entrie[1]}</span>`
            section.appendChild(span)
        })

        content.appendChild(section)

    });


    // minifyProcessesData.forEach(element => {
    //     console.log(element)
    //     deepOutput(element, content)
    // })
}