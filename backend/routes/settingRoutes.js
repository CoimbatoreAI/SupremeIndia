const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Settings = require('../models/Settings');
const { uploadBrochure } = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.get('/brochure', async (req, res) => {
    try {
        const setting = await Settings.findOne({ key: 'brochure' });
        res.json(setting || { value: '' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/brochure/download', async (req, res) => {
    try {
        const setting = await Settings.findOne({ key: 'brochure' });
        if (setting && setting.value) {
            const filePath = path.join(__dirname, '../uploads/brochure', setting.value);
            res.download(filePath, `SupremeIndia_Brochure${path.extname(setting.value)}`);
        } else {
            res.status(404).json({ message: 'Brochure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/brochure', protect, uploadBrochure.single('file'), async (req, res) => {
    try {
        const brochure = await Settings.findOneAndUpdate(
            { key: 'brochure' },
            { value: req.file.filename },
            { upsert: true, new: true }
        );
        res.json(brochure);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/brochure', protect, async (req, res) => {
    try {
        const brochure = await Settings.findOne({ key: 'brochure' });
        if (!brochure || !brochure.value) {
            return res.status(404).json({ message: 'No brochure found or brochure file not set' });
        }

        const filename = brochure.value;
        // Assuming 'uploads/brochure' is relative to the project root,
        // and this file is in 'routes/', so we go up one level to the project root.
        const filePath = path.join(__dirname, '../uploads/brochure', filename);

        fs.unlink(filePath, async (err) => {
            if (err) {
                // If the file doesn't exist, it's not necessarily an error we want to stop the DB deletion for.
                // But if it's another error, we should report it.
                if (err.code === 'ENOENT') {
                    console.warn(`Brochure file not found on disk: ${filePath}. Proceeding to delete DB entry.`);
                } else {
                    console.error(`Error deleting brochure file ${filePath}:`, err);
                    return res.status(500).json({ message: 'Failed to delete brochure file from server', error: err.message });
                }
            }

            // If file deleted successfully or not found, clear database entry
            await Settings.deleteOne({ key: 'brochure' });
            res.json({ message: 'Brochure and associated file removed successfully' });
        });

    } catch (error) {
        console.error('Error in DELETE /brochure:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
