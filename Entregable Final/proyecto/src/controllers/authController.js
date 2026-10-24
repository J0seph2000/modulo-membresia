const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const resultado = await authService.registrar(req.body);
  res.status(201).json({ mensaje: 'Usuario creado correctamente.', ...resultado });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  res.json(await authService.iniciarSesion(req.body));
});

module.exports = { register, login };
