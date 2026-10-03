const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/authMiddleware');
const { getMembresias, crearMembresia } = require('../controllers/membresiaController');

router.get('/', verificarToken, getMembresias);
router.post('/', verificarToken, crearMembresia);

module.exports = router;
