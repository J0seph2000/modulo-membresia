const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verifica que la petición traiga un token JWT válido en el header Authorization: Bearer <token>
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Acceso denegado: no se envió token.' });
  }

  const token = authHeader.split(' ')[1]; // formato esperado: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ mensaje: 'Formato de token inválido.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // queda disponible en los controladores: req.usuario.id_usuario, req.usuario.rol
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
}

// Middleware opcional: solo deja pasar si el rol del usuario está en la lista permitida
function verificarRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'No tienes permisos para esta acción.' });
    }
    next();
  };
}

module.exports = { verificarToken, verificarRol };
