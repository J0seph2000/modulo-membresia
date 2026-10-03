const pool = require('../config/db');

// GET /api/planes
async function getPlanes(req, res) {
  try {
    const [filas] = await pool.query('SELECT id_plan, nombre_plan, precio FROM Planes ORDER BY id_plan');
    res.json(filas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los planes.' });
  }
}

// POST /api/planes
async function crearPlan(req, res) {
  try {
    const { nombre_plan, precio } = req.body;

    if (!nombre_plan || precio === undefined) {
      return res.status(400).json({ mensaje: 'nombre_plan y precio son obligatorios.' });
    }

    const [resultado] = await pool.query(
      'INSERT INTO Planes (nombre_plan, precio) VALUES (?, ?)',
      [nombre_plan, precio]
    );

    res.status(201).json({ mensaje: 'Plan creado correctamente.', id_plan: resultado.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el plan.' });
  }
}

module.exports = { getPlanes, crearPlan };
