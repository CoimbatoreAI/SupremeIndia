const express = require('express');
const router = express.Router();
const { getMachines, createMachine, updateMachine, deleteMachine } = require('../controllers/machineController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.route('/').get(getMachines).post(protect, upload.single('image'), createMachine);
router.route('/:id').put(protect, upload.single('image'), updateMachine).delete(protect, deleteMachine);

module.exports = router;
