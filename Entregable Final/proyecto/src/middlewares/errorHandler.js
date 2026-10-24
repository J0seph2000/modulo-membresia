const ApiError = require('../utils/ApiError');

// 404 para rutas inexistentes (se registra después de todas las rutas)
function notFoundHandler(req, res, next) {
  next(ApiError.notFound(`La ruta ${req.method} ${req.originalUrl} no existe.`));
}

// Traduce errores conocidos de MySQL a errores de la API
function traducirErrorBD(err) {
  if (err.code === 'ER_NO_REFERENCED_ROW_2') return ApiError.unprocessable('Se hace referencia a un registro que no existe (por ejemplo id_cliente o id_plan).');
  if (err.code === 'ER_ROW_IS_REFERENCED_2') return ApiError.conflict('No se puede eliminar: otros registros dependen de este (por ejemplo, tiene membresías).');
  if (err.code === 'ER_DUP_ENTRY') return ApiError.conflict('Ya existe un registro con esos datos.');
  return null;
}

// Manejador global: TODA respuesta de error sale como application/problem+json (RFC 9457)
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let problema = err instanceof ApiError ? err : null;

  if (!problema && err.type === 'entity.parse.failed') {
    problema = ApiError.badRequest('El cuerpo de la petición no es un JSON válido.');
  }
  if (!problema) problema = traducirErrorBD(err);
  if (!problema) {
    console.error(err);
    problema = new ApiError(500, 'Ocurrió un error inesperado. Intenta de nuevo más tarde.');
  }

  for (const [k, v] of Object.entries(problema.headers || {})) res.set(k, v);

  res.status(problema.status).type('application/problem+json').json({
    type: problema.type,
    title: problema.title,
    status: problema.status,
    detail: problema.detail,
    instance: req.originalUrl,
    ...problema.extensions,
  });
}

module.exports = { notFoundHandler, errorHandler };
