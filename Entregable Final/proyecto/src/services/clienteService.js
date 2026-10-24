const clienteRepository = require('../repositories/clienteRepository');
const { ClienteDTO, ClienteCreateDTO, ESTADOS_CLIENTE } = require('../dtos/ClienteDTO');
const ApiError = require('../utils/ApiError');

function validarId(id) {
  const n = Number(id);
  if (!Number.isInteger(n) || n <= 0) {
    throw ApiError.badRequest('El id debe ser un entero positivo.', [{ campo: 'id', mensaje: 'id debe ser un entero positivo.' }]);
  }
  return n;
}

async function listarClientes({ estado, q } = {}) {
  if (estado !== undefined && !ESTADOS_CLIENTE.includes(estado)) {
    throw ApiError.badRequest('El filtro estado no es válido.', [
      { campo: 'estado', mensaje: `estado debe ser uno de: ${ESTADOS_CLIENTE.join(', ')}.` },
    ]);
  }
  const texto = typeof q === 'string' && q.trim() ? q.trim() : undefined;
  const filas = await clienteRepository.obtenerTodos({ estado, q: texto });
  return filas.map(ClienteDTO.fromEntity);
}

async function obtenerCliente(id) {
  const fila = await clienteRepository.obtenerPorId(validarId(id));
  if (!fila) throw ApiError.notFound(`No existe un cliente con id ${id}.`);
  return ClienteDTO.fromEntity(fila);
}

async function crearCliente(body) {
  const dto = new ClienteCreateDTO(body);
  const errores = dto.validar();
  if (errores.length) throw ApiError.badRequest('Los datos del cliente no son válidos.', errores);
  const id_cliente = await clienteRepository.crear(dto);
  return { id_cliente };
}

async function actualizarCliente(id, body) {
  const idValido = validarId(id);
  const dto = new ClienteCreateDTO(body);
  const errores = dto.validar();
  if (errores.length) throw ApiError.badRequest('Los datos del cliente no son válidos.', errores);
  if (!(await clienteRepository.actualizar(idValido, dto))) throw ApiError.notFound(`No existe un cliente con id ${id}.`);
}

async function eliminarCliente(id) {
  if (!(await clienteRepository.eliminar(validarId(id)))) throw ApiError.notFound(`No existe un cliente con id ${id}.`);
}

module.exports = { listarClientes, obtenerCliente, crearCliente, actualizarCliente, eliminarCliente };
