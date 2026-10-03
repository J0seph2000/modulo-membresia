# FitControl - Backend (API REST)

Boilerplate del backend para el proyecto final de Desarrollo Web (UMG), inciso:
**"Desarrollo Backend (Boilerplate) y primeros endpoints operativos"**.

## De dónde sale este modelo de datos

El dominio (Usuarios, Clientes, Planes, Membresías) se tomó del prototipo de
escritorio en C#/WinForms del repositorio `Fit-Control` (carpeta `FitControl`),
que ya tenía la lógica de negocio pensada aunque usaba SQL Server y una app de
escritorio. Aquí se migra esa misma idea a una API REST con Node.js + MySQL,
que es lo que el frontend web va a consumir.

## Stack usado

- **Node.js + Express** — servidor y rutas.
- **MySQL** (vía `mysql2`) — base de datos.
- **JWT** (`jsonwebtoken`) — autenticación por token.
- **bcryptjs** — hash de contraseñas (el prototipo original las comparaba en
  texto plano; aquí ya quedan protegidas).
- **dotenv** — variables de entorno (credenciales fuera del código).
- **cors** — para que el frontend (en otro puerto/dominio) pueda llamar a la API.

> Si tu equipo ya había decidido otro stack (ej. .NET, Django, Spring), avísame
> y adapto esta misma estructura a ese lenguaje — la lógica es la misma.

## Estructura del proyecto

```
fitcontrol-backend/
├── database/
│   └── schema.sql          # Script para crear la base de datos y tablas
├── src/
│   ├── config/
│   │   └── db.js           # Conexión (pool) a MySQL
│   ├── controllers/        # Lógica de cada recurso
│   │   ├── authController.js
│   │   ├── clienteController.js
│   │   ├── planController.js
│   │   └── membresiaController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # Verifica el token JWT en cada petición protegida
│   ├── routes/              # Define las URLs de cada recurso
│   │   ├── authRoutes.js
│   │   ├── clienteRoutes.js
│   │   ├── planRoutes.js
│   │   └── membresiaRoutes.js
│   ├── app.js               # Configuración de Express (middlewares, rutas)
│   └── server.js            # Punto de entrada: levanta el servidor
├── .env.example
├── .gitignore
└── package.json
```

## Cómo correrlo

1. Instala las dependencias:
   ```
   npm install
   ```
2. Crea la base de datos ejecutando `database/schema.sql` en tu MySQL
   (Workbench, phpMyAdmin, o `mysql -u root -p < database/schema.sql`).
3. Copia `.env.example` a `.env` y pon tus datos reales de conexión y un
   `JWT_SECRET` propio.
4. Levanta el servidor:
   ```
   npm run dev
   ```
   (o `npm start` si no tienes `nodemon`)
5. Prueba que esté vivo: `GET http://localhost:3000/api/health`

## Endpoints que quedaron operativos

| Método | Ruta                  | Protegida | Qué hace                              |
|--------|-----------------------|-----------|----------------------------------------|
| GET    | /api/health           | No        | Verifica que el servidor responde      |
| POST   | /api/auth/register    | No        | Crea un usuario (hashea el password)   |
| POST   | /api/auth/login       | No        | Devuelve un JWT si usuario/clave OK    |
| GET    | /api/clientes         | Sí        | Lista todos los clientes               |
| GET    | /api/clientes/:id     | Sí        | Trae un cliente por ID                 |
| POST   | /api/clientes         | Sí        | Crea un cliente                        |
| PUT    | /api/clientes/:id     | Sí        | Actualiza un cliente                   |
| DELETE | /api/clientes/:id     | Sí        | Elimina un cliente                     |
| GET    | /api/planes           | Sí        | Lista los planes                       |
| POST   | /api/planes           | Sí        | Crea un plan                           |
| GET    | /api/membresias       | Sí        | Lista membresías con cliente y plan    |
| POST   | /api/membresias       | Sí        | Crea una membresía                     |

"Protegida" = hay que mandar el header `Authorization: Bearer <token>` que te
devuelve el login.

## Flujo para probarlo (ej. con Postman/Thunder Client)

1. `POST /api/auth/register` con body:
   ```json
   { "usuario": "admin", "password": "admin123", "rol": "Admin" }
   ```
2. `POST /api/auth/login` con el mismo usuario/password → copia el `token` que regresa.
3. En cualquier otra petición (ej. `GET /api/clientes`), agrega el header:
   `Authorization: Bearer <el_token_que_copiaste>`

## Lo que falta para siguientes sprints (no es parte de este inciso)

- Sistema de colas (ej. BullMQ + Redis) para tareas asíncronas — mencionado en
  el alcance general del proyecto, pero no es parte de "boilerplate y primeros
  endpoints", así que se deja como siguiente iteración.
- Validaciones más robustas de los datos de entrada (ej. con `express-validator`).
- Endpoints de actualizar/eliminar para Planes y Membresías (ahora solo tienen listar/crear).
