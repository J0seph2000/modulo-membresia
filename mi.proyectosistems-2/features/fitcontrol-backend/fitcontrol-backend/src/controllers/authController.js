const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

// POST /api/auth/register
// Crea un usuario nuevo. En producción normalmente esto lo haría solo un Admin,
// pero aquí queda abierto para poder crear el primer usuario de prueba fácilmente.
async function register(req, res) {
  try {
    const { usuario, password, rol } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'usuario y password son obligatorios.' });
    }

    const [existentes] = await pool.query(
      'SELECT id_usuario FROM Usuarios WHERE usuario = ?',
      [usuario]
    );

    if (existentes.length > 0) {
      return res.status(409).json({ mensaje: 'Ese nombre de usuario ya existe.' });
    }

    const hash = await bcrypt.hash(password, 10);

    const [resultado] = await pool.query(
      'INSERT INTO Usuarios (usuario, password, rol) VALUES (?, ?, ?)',
      [usuario, hash, rol || 'Empleado']
    );

    res.status(201).json({
      mensaje: 'Usuario creado correctamente.',
      id_usuario: resultado.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor al registrar usuario.' });
  }
}

// POST /api/auth/login
// Verifica usuario/password y devuelve un token JWT si son correctos.
async function login(req, res) {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'usuario y password son obligatorios.' });
    }

    const [filas] = await pool.query(
      'SELECT id_usuario, usuario, password, rol FROM Usuarios WHERE usuario = ?',
      [usuario]
    );

    if (filas.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });
    }

    const usuarioDB = filas[0];
    const passwordValida = await bcrypt.compare(password, usuarioDB.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });
    }

    const token = jwt.sign(
      { id_usuario: usuarioDB.id_usuario, usuario: usuarioDB.usuario, rol: usuarioDB.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      mensaje: 'Acceso correcto a FitControl.',
      token,
      usuario: { id_usuario: usuarioDB.id_usuario, usuario: usuarioDB.usuario, rol: usuarioDB.rol },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor al iniciar sesión.' });
  }
}

module.exports = { register, login };
