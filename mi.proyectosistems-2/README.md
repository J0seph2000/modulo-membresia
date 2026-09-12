# FitControl — Análisis, Rediseño Arquitectónico y Contrato API

Proyecto de ingeniería inversa y rediseño arquitectónico del sistema **FitControl**, una aplicación de escritorio para la gestión de un gimnasio (clientes, planes, membresías y reportes). Este repositorio documenta el análisis del sistema legado, la arquitectura propuesta (Monolito Modular), el contrato de API en OpenAPI 3.0, los diagramas C4 y el diseño de persistencia y caché.

## Integrantes

| Nombre | Carné |
|---|---|
| [Nombre del estudiante 1] | [Carné] |
| [Nombre del estudiante 2] | [Carné] |
| [Nombre del estudiante 3] | [Carné] |

**Curso:** [Nombre del curso]
**Docente:** [Nombre del docente]
**Fecha de entrega:** [dd/mm/aaaa]

## Guía rápida del proyecto

Este repositorio está organizado para que cada componente de la evaluación se encuentre en una ruta específica:

| Quiero ver... | Dónde está |
|---|---|
| El informe completo (las 13 secciones) | [`docs/Informe_Ingenieria_Inversa_GrupoXX.pdf`](docs/Informe_Ingenieria_Inversa_GrupoXX.pdf) |
| El contrato de la API | [`docs/api/openapi.yaml`](docs/api/openapi.yaml) |
| Evidencia de la API funcionando en Swagger UI | [`docs/api/swagger_ui.png`](docs/api/swagger_ui.png) |
| Diagrama de la arquitectura legada | [`docs/legacy/arquitectura_legado.png`](docs/legacy/arquitectura_legado.png) |
| Diagramas C4 (Contexto, Contenedores, Componentes) | [`docs/c4/`](docs/c4/) |
| Fuentes editables de los diagramas C4 (`.puml`) | [`docs/c4/src/`](docs/c4/src/) |
| Modelo de datos (DER) | [`docs/database/modelo_datos.png`](docs/database/modelo_datos.png) |
| Script de creación de la base de datos | [`docs/database/schema.sql`](docs/database/schema.sql) |
| Estrategia de caché con Redis | [`docs/cache/estrategia_cache.png`](docs/cache/estrategia_cache.png) |

## Resumen del proyecto

- **Sistema legado:** aplicación de escritorio en C# (Windows Forms) con SQL Server, sin separación de capas: la interfaz, la lógica de negocio y el acceso a datos están mezclados en cada formulario.
- **Arquitectura propuesta:** Monolito Modular — un único backend desplegable, organizado internamente en los módulos Auth, Clientes, Membresías, Pagos y Reportes, expuesto mediante una API REST con autenticación JWT.
- **Persistencia:** SQL Server, con un modelo relacional que agrega la entidad `Pagos` (no existente en el sistema legado) para soportar el procesamiento de pagos.
- **Caché:** Redis con el patrón Cache-Aside, aplicado al catálogo de planes, consultas de clientes y reportes agregados.

## Tecnologías

| Elemento | Tecnología |
|---|---|
| Backend (propuesto) | API REST / JSON |
| Autenticación | JWT (Bearer Token) |
| Base de datos | SQL Server |
| Caché | Redis |
| Documentación de API | OpenAPI 3.0 (Swagger) |
| Diagramación | C4 Model (PlantUML) |

## Estructura del repositorio

```
mi-proyecto-sistema2/
├── README.md
└── docs/
    ├── Informe_Ingenieria_Inversa_GrupoXX.pdf
    ├── legacy/
    │   ├── arquitectura_legado.png
    │   └── arquitectura_legado.puml
    ├── api/
    │   ├── openapi.yaml
    │   └── swagger_ui.png
    ├── c4/
    │   ├── c4_nivel1_contexto.png
    │   ├── c4_nivel2_contenedores.png
    │   ├── c4_nivel3_componentes.png
    │   └── src/
    │       ├── c4_nivel1_contexto.puml
    │       ├── c4_nivel2_contenedores.puml
    │       └── c4_nivel3_componentes.puml
    ├── database/
    │   ├── modelo_datos.png
    │   └── schema.sql
    └── cache/
        └── estrategia_cache.png
```

## Cómo validar el contrato de la API

1. Abre [editor.swagger.io](https://editor.swagger.io).
2. Pega el contenido de `docs/api/openapi.yaml`.
3. Confirma que no haya errores de sintaxis y que los endpoints `/auth/login` y `/payments/process` se muestren correctamente, incluyendo sus esquemas y la seguridad Bearer.

## Cómo ver los diagramas C4

Los archivos `.puml` en `docs/c4/src/` se pueden abrir en:
- [PlantUML Online Server](https://www.plantuml.com/plantuml)
- La extensión **PlantUML** de VS Code
- [draw.io](https://app.diagrams.net) (Extras → Import from → mediante el visor de PlantUML, o regenerando la imagen desde el editor online y pegándola)

## Cómo ejecutar el script de base de datos

El script `docs/database/schema.sql` crea la base de datos `FitControl`, sus tablas, relaciones e índices, e inserta datos de prueba. Para ejecutarlo:

```sql
-- Desde SQL Server Management Studio o sqlcmd:
sqlcmd -S <servidor> -i docs/database/schema.sql
```

## Licencia

Proyecto académico desarrollado para el curso [Nombre del curso], Universidad Mariano Gálvez.
