const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');
const UsuarioDTO = require('../dtos/UsuarioDTO');
const LoginResponseDTO = require('../dtos/LoginResponseDTO');
const ApiError = require('../utils/ApiError');
require('dotenv').config();

const ROLES = ['Admin', 'Empleado'];

async function registrar({ usuario, password, rol } = {}) {
  const errores = [];
  if (!usuario) errores.push({ campo: 'usuario', mensaje: 'usuario es obligatorio.' });
  if (!password) errores.push({ campo: 'password', mensaje: 'password es obligatorio.' });
  else if (String(password).length < 6) errores.push({ campo: 'password', mensaje: 'password debe tener al menos 6 caracteres.' });
  if (rol !== undefined && !ROLES.includes(rol)) errores.push({ campo: 'rol', mensaje: `rol debe ser uno de: ${ROLES.join(', ')}.` });
  if (errores.length) throw ApiError.badRequest('Los datos de registro no son válidos.', errores);

  if (await usuarioRepository.buscarPorUsuario(usuario)) {
    throw ApiError.conflict('Ese nombre de usuario ya existe.');
  }

  const hash = await bcrypt.hash(password, 10);
  const id_usuario = await usuarioRepository.crear(usuario, hash, rol || 'Empleado');
  return { id_usuario };
}

async function iniciarSesion({ usuario, password } = {}) {
  const errores = [];
  if (!usuario) errores.push({ campo: 'usuario', mensaje: 'usuario es obligatorio.' });
  if (!password) errores.push({ campo: 'password', mensaje: 'password es obligatorio.' });
  if (errores.length) throw ApiError.badRequest('Debes enviar usuario y password.', errores);

  const usuarioDB = await usuarioRepository.buscarPorUsuario(usuario);
  const valido = usuarioDB && (await bcrypt.compare(password, usuarioDB.password));
  if (!valido) throw ApiError.unauthorized('Usuario o contraseña incorrectos.');

  const usuarioDTO = UsuarioDTO.fromEntity(usuarioDB);
  const token = jwt.sign(
    { id_usuario: usuarioDTO.id_usuario, usuario: usuarioDTO.usuario, rol: usuarioDTO.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );
  return new LoginResponseDTO(token, usuarioDTO);
}

module.exports = { registrar, iniciarSesion, ROLES };
