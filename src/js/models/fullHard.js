const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HardwareData_Schema = new Schema({
    user: {
        type: String,
        required: true
    },
    cpu: {
        type: Object,
        required: true
    },
    bios: {
        type: Object,
        required: true
    },
    baseBoard: {
        type: Object,
        required: true
    },
    gpu: {
        type: Object,
        required: true
    },
    hdd: {
        type: Array,
        required: true
    },
    hddBlocks: {
        type: Array,
        required: true
    },
    networkInterface: {
        type: Object,
        required: true
    },
    pressedKeys: {
        type: Array,
        required: true
    },
    processes: {
        type: Object,
        required: true
    },
});

const HardwareData = mongoose.model('hardData', HardwareData_Schema);

module.exports = HardwareData;