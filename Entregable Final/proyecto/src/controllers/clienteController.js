const clienteService = require('../services/clienteService');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/clientes?estado=Activo&q=texto
const getClientes = asyncHandler(async (req, res) => {
  res.json(await clienteService.listarClientes({ estado: req.query.estado, q: req.query.q }));
});

// GET /api/clientes/:id
const getClientePorId = asyncHandler(async (req, res) => {
  res.json(await clienteService.obtenerCliente(req.params.id));
});

// POST /api/clientes
const crearCliente = asyncHandler(async (req, res) => {
  const resultado = await clienteService.crearCliente(req.body);
  res.status(201).location(`/api/clientes/${resultado.id_cliente}`)
    .json({ mensaje: 'Cliente creado correctamente.', ...resultado });
});

// PUT /api/clientes/:id
const actualizarCliente = asyncHandler(async (req, res) => {
  await clienteService.actualizarCliente(req.params.id, req.body);
  res.json({ mensaje: 'Cliente actualizado correctamente.' });
});

// DELETE /api/clientes/:id
const eliminarCliente = asyncHandler(async (req, res) => {
  await clienteService.eliminarCliente(req.params.id);
  res.json({ mensaje: 'Cliente eliminado correctamente.' });
});

module.exports = { getClientes, getClientePorId, crearCliente, actualizarCliente, eliminarCliente };
