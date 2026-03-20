const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: String, required: true },
    features: [{ type: String }],
    image: { type: String }
});

module.exports = mongoose.model('Machine', machineSchema);
