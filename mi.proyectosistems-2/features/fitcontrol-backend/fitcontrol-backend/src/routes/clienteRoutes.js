const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/authMiddleware');
const {
  getClientes,
  getClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} = require('../controllers/clienteController');

// Todas las rutas de clientes requieren estar logueado (token válido)
router.get('/', verificarToken, getClientes);
router.get('/:id', verificarToken, getClientePorId);
router.post('/', verificarToken, crearCliente);
router.put('/:id', verificarToken, actualizarCliente);
router.delete('/:id', verificarToken, eliminarCliente);

module.exports = router;
