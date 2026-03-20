const Machine = require('../models/Machine');

const getMachines = async (req, res) => {
    try {
        const machines = await Machine.find({});
        res.json(machines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMachine = async (req, res) => {
    const { name, capacity, features } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    try {
        const machine = new Machine({ name, capacity, features, image });
        const createdMachine = await machine.save();
        res.status(201).json(createdMachine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateMachine = async (req, res) => {
    const { name, capacity, features } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    try {
        const machine = await Machine.findById(req.params.id);

        if (machine) {
            machine.name = name || machine.name;
            machine.capacity = capacity || machine.capacity;
            machine.features = features || machine.features;
            if (image) machine.image = image;

            const updatedMachine = await machine.save();
            res.json(updatedMachine);
        } else {
            res.status(404).json({ message: 'Machine not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMachine = async (req, res) => {
    try {
        const machine = await Machine.findById(req.params.id);

        if (machine) {
            await Machine.deleteOne({ _id: req.params.id });
            res.json({ message: 'Machine removed' });
        } else {
            res.status(404).json({ message: 'Machine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMachines, createMachine, updateMachine, deleteMachine };
