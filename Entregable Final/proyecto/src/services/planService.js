const planRepository = require('../repositories/planRepository');
const cache = require('../utils/cache');
const ApiError = require('../utils/ApiError');

const CLAVE_CACHE = 'planes:lista';

// Devuelve { datos, cache: 'HIT' | 'MISS' } para que el controller informe el encabezado X-Cache
async function listarPlanes() {
  const guardado = cache.get(CLAVE_CACHE);
  if (guardado) return { datos: guardado, cache: 'HIT' };
  const datos = await planRepository.obtenerTodos();
  cache.set(CLAVE_CACHE, datos);
  return { datos, cache: 'MISS' };
}

async function crearPlan({ nombre_plan, precio } = {}) {
  const errores = [];
  if (typeof nombre_plan !== 'string' || !nombre_plan.trim()) errores.push({ campo: 'nombre_plan', mensaje: 'nombre_plan es obligatorio.' });
  const precioNum = Number(precio);
  if (precio === undefined || precio === null || precio === '' || !Number.isFinite(precioNum) || precioNum < 0) {
    errores.push({ campo: 'precio', mensaje: 'precio debe ser un número mayor o igual a 0.' });
  }
  if (errores.length) throw ApiError.badRequest('Los datos del plan no son válidos.', errores);

  const id_plan = await planRepository.crear({ nombre_plan: nombre_plan.trim(), precio: precioNum });
  cache.invalidar('planes:'); // el catálogo cambió: la caché ya no es válida
  return { id_plan };
}

module.exports = { listarPlanes, crearPlan };
