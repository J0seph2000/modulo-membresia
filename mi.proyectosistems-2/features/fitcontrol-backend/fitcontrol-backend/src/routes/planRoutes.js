const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/authMiddleware');
const { getPlanes, crearPlan } = require('../controllers/planController');

router.get('/', verificarToken, getPlanes);
router.post('/', verificarToken, crearPlan);

module.exports = router;
