const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
require('dotenv').config();

const CHALLENGE = { 'WWW-Authenticate': 'Bearer realm="fitcontrol"' };

// Exige el encabezado Authorization: Bearer <token> (RFC 9110: 401 + WWW-Authenticate)
function verificarToken(req, res, next) {
  const cabecera = req.headers['authorization'];
  if (!cabecera) return next(ApiError.unauthorized('No se envió el encabezado Authorization.', CHALLENGE));

  const [esquema, token] = cabecera.split(' ');
  if (esquema !== 'Bearer' || !token) {
    return next(ApiError.unauthorized('El formato debe ser: Authorization: Bearer <token>.', CHALLENGE));
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    next(ApiError.unauthorized('El token es inválido o ya expiró.', CHALLENGE));
  }
}

// Solo deja pasar si el rol del usuario está en la lista permitida
function verificarRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return next(ApiError.forbidden('Tu rol no tiene permisos para esta acción.'));
    }
    next();
  };
}

module.exports = { verificarToken, verificarRol };
