const pool = require('../config/db');

// GET /api/membresias
// Trae la membresía junto con el nombre del cliente y del plan (como hacía el formulario de escritorio)
async function getMembresias(req, res) {
  try {
    const [filas] = await pool.query(`
      SELECT M.id_membresia AS id,
             CONCAT(C.nombre, ' ', C.apellido) AS cliente,
             P.nombre_plan AS plan,
             M.fecha_inicio,
             M.fecha_fin,
             M.estado
      FROM Membresias M
      JOIN Clientes C ON C.id_cliente = M.id_cliente
      JOIN Planes P ON P.id_plan = M.id_plan
      ORDER BY M.id_membresia DESC
    `);
    res.json(filas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las membresías.' });
  }
}

// POST /api/membresias
async function crearMembresia(req, res) {
  try {
    const { fecha_inicio, fecha_fin, estado, id_cliente, id_plan } = req.body;

    if (!fecha_inicio || !fecha_fin || !id_cliente || !id_plan) {
      return res.status(400).json({
        mensaje: 'fecha_inicio, fecha_fin, id_cliente e id_plan son obligatorios.',
      });
    }

    const [resultado] = await pool.query(
      `INSERT INTO Membresias (fecha_inicio, fecha_fin, estado, id_cliente, id_plan)
       VALUES (?, ?, ?, ?, ?)`,
      [fecha_inicio, fecha_fin, estado || 'Activa', id_cliente, id_plan]
    );

    res.status(201).json({ mensaje: 'Membresía creada correctamente.', id_membresia: resultado.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la membresía.' });
  }
}

module.exports = { getMembresias, crearMembresia };
