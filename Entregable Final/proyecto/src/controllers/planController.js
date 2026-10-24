const planService = require('../services/planService');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/planes  (con caché; el encabezado X-Cache indica HIT o MISS)
const getPlanes = asyncHandler(async (req, res) => {
  const { datos, cache } = await planService.listarPlanes();
  res.set('X-Cache', cache).json(datos);
});

// POST /api/planes
const crearPlan = asyncHandler(async (req, res) => {
  const resultado = await planService.crearPlan(req.body);
  res.status(201).json({ mensaje: 'Plan creado correctamente.', ...resultado });
});

module.exports = { getPlanes, crearPlan };
