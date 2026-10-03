const pool = require('../config/db');

// GET /api/clientes
async function getClientes(req, res) {
  try {
    const [filas] = await pool.query(
      'SELECT id_cliente, nombre, apellido, telefono, direccion, estado FROM Clientes ORDER BY id_cliente DESC'
    );
    res.json(filas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los clientes.' });
  }
}

// GET /api/clientes/:id
async function getClientePorId(req, res) {
  try {
    const { id } = req.params;
    const [filas] = await pool.query(
      'SELECT id_cliente, nombre, apellido, telefono, direccion, estado FROM Clientes WHERE id_cliente = ?',
      [id]
    );

    if (filas.length === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado.' });
    }

    res.json(filas[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el cliente.' });
  }
}

// POST /api/clientes
async function crearCliente(req, res) {
  try {
    const { nombre, apellido, telefono, direccion, estado } = req.body;

    if (!nombre || !apellido) {
      return res.status(400).json({ mensaje: 'nombre y apellido son obligatorios.' });
    }

    const [resultado] = await pool.query(
      'INSERT INTO Clientes (nombre, apellido, telefono, direccion, estado) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, telefono || null, direccion || null, estado || 'Activo']
    );

    res.status(201).json({ mensaje: 'Cliente creado correctamente.', id_cliente: resultado.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el cliente.' });
  }
}

// PUT /api/clientes/:id
async function actualizarCliente(req, res) {
  try {
    const { id } = req.params;
    const { nombre, apellido, telefono, direccion, estado } = req.body;

    const [resultado] = await pool.query(
      `UPDATE Clientes
       SET nombre = ?, apellido = ?, telefono = ?, direccion = ?, estado = ?
       WHERE id_cliente = ?`,
      [nombre, apellido, telefono, direccion, estado, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado.' });
    }

    res.json({ mensaje: 'Cliente actualizado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el cliente.' });
  }
}

// DELETE /api/clientes/:id
async function eliminarCliente(req, res) {
  try {
    const { id } = req.params;
    const [resultado] = await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado.' });
    }

    res.json({ mensaje: 'Cliente eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el cliente.' });
  }
}

module.exports = {
  getClientes,
  getClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
