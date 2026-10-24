const membresiaRepository = require('../repositories/membresiaRepository');
const ApiError = require('../utils/ApiError');

function esFechaISO(valor) {
  if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const f = new Date(`${valor}T00:00:00Z`);
  return !Number.isNaN(f.getTime()) && f.toISOString().slice(0, 10) === valor;
}
const esIdValido = (v) => Number.isInteger(Number(v)) && Number(v) > 0;

async function listarMembresias() {
  return membresiaRepository.obtenerTodas();
}

async function crearMembresia(body = {}) {
  const { fecha_inicio, fecha_fin, id_cliente, id_plan } = body;
  const errores = [];
  if (!esFechaISO(fecha_inicio)) errores.push({ campo: 'fecha_inicio', mensaje: 'fecha_inicio debe tener formato AAAA-MM-DD y ser una fecha real.' });
  if (!esFechaISO(fecha_fin)) errores.push({ campo: 'fecha_fin', mensaje: 'fecha_fin debe tener formato AAAA-MM-DD y ser una fecha real.' });
  else if (esFechaISO(fecha_inicio) && fecha_fin < fecha_inicio) errores.push({ campo: 'fecha_fin', mensaje: 'fecha_fin no puede ser anterior a fecha_inicio.' });
  if (!esIdValido(id_cliente)) errores.push({ campo: 'id_cliente', mensaje: 'id_cliente debe ser un entero positivo.' });
  if (!esIdValido(id_plan)) errores.push({ campo: 'id_plan', mensaje: 'id_plan debe ser un entero positivo.' });
  if (errores.length) throw ApiError.badRequest('Los datos de la membresía no son válidos.', errores);

  const id_membresia = await membresiaRepository.crear(body);
  return { id_membresia };
}

module.exports = { listarMembresias, crearMembresia };
