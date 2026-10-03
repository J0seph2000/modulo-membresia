# FitControl Backend — Guía rápida

## 1. Cómo prenderlo de nuevo (cada vez que vuelvas a trabajar)

1. Abre el **Panel de Control de XAMPP**.
2. Dale **Start** a **MySQL** (espera a que se ponga verde).
3. Abre **VS Code** en la carpeta `fitcontrol-backend`.
4. Abre una terminal (Terminal → Nueva Terminal).
5. Escribe:
   ```
   npm run dev
   ```
6. Confirma que te salga:
   ```
   Servidor de FitControl corriendo en http://localhost:3000
   ```
7. Deja esa terminal abierta mientras trabajas. Para apagarlo: `Ctrl + C` en esa terminal.

> Si cierras VS Code o reinicias la compu, tienes que repetir estos pasos (prender MySQL en XAMPP y correr `npm run dev` de nuevo). El `.env` y el `node_modules` quedan guardados, no hay que reinstalar nada.

## 2. Cómo probar los endpoints en Thunder Client

### Paso 0 — Verificar que el servidor responde
- **GET** `http://localhost:3000/api/health`
- Sin headers, sin body.
- Debe responder: `{ "estado": "ok", ... }`

### Paso 1 — Registrar un usuario (solo la primera vez)
- **POST** `http://localhost:3000/api/auth/register`
- Pestaña **Body** → **JSON**:
  ```json
  { "usuario": "admin", "password": "admin123", "rol": "Admin" }
  ```

### Paso 2 — Login (cada vez que necesites un token nuevo)
- **POST** `http://localhost:3000/api/auth/login`
- Pestaña **Body** → **JSON**:
  ```json
  { "usuario": "admin", "password": "admin123" }
  ```
- Copia el valor de `"token"` de la respuesta (sin comillas).

> El token expira en 8 horas. Cuando deje de funcionar (error 403), repite este paso para sacar uno nuevo.
>
> **Antes de tu presentación:** no hay un token "fijo" guardado en ningún lado — cada login genera uno nuevo. Haz login de nuevo justo antes de la demo para tener un token fresco, y aprovecha para hacerlo en vivo frente al profesor: así demuestras que el flujo de JWT funciona de verdad.

### Paso 3 — Usar el token en endpoints protegidos
En cualquier request a `/api/clientes`, `/api/planes` o `/api/membresias`:
- Pestaña **Headers** → agrega:
  - Key: `Authorization`
  - Value: `Bearer ` + el token (un solo espacio entre "Bearer" y el token, sin comillas, sin nada más)

### Endpoints disponibles

| Método | Ruta | Requiere token | Body (JSON) |
|---|---|---|---|
| GET | /api/health | No | — |
| POST | /api/auth/register | No | `{ "usuario", "password", "rol" }` |
| POST | /api/auth/login | No | `{ "usuario", "password" }` |
| GET | /api/clientes | Sí | — |
| GET | /api/clientes/:id | Sí | — |
| POST | /api/clientes | Sí | `{ "nombre", "apellido", "telefono", "direccion", "estado" }` |
| PUT | /api/clientes/:id | Sí | igual que POST |
| DELETE | /api/clientes/:id | Sí | — |
| GET | /api/planes | Sí | — |
| POST | /api/planes | Sí | `{ "nombre_plan", "precio" }` |
| GET | /api/membresias | Sí | — |
| POST | /api/membresias | Sí | `{ "fecha_inicio", "fecha_fin", "estado", "id_cliente", "id_plan" }` |

### Errores comunes al probar

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| `401 Acceso denegado: no se envió token` | Falta el header Authorization | Agrégalo (Paso 3) |
| `403 Token inválido o expirado` | El token ya venció o está mal copiado | Haz login de nuevo (Paso 2) |
| No conecta / error de MySQL en la terminal | XAMPP no está prendido | Abre XAMPP y dale Start a MySQL |
| `Cannot GET /api/...` | Mal escrita la URL o el servidor no está corriendo | Revisa la URL y que `npm run dev` siga activo |
