const membresiaService = require('../services/membresiaService');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/membresias
const getMembresias = asyncHandler(async (req, res) => {
  res.json(await membresiaService.listarMembresias());
});

// POST /api/membresias
const crearMembresia = asyncHandler(async (req, res) => {
  const resultado = await membresiaService.crearMembresia(req.body);
  res.status(201).json({ mensaje: 'Membresía creada correctamente.', ...resultado });
});

module.exports = { getMembresias, crearMembresia };
