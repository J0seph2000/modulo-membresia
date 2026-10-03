
# Componente 1: Requerimientos Ágiles y Product Backlog Priorizado

**Proyecto:** Módulo de Membresía  
**Enlace al Tablero Ágil Activo:** [Ver Tablero en GitHub Projects](https://github.com/users/J0seph2000/projects/1/views/1)
---

## 1. Estructura Jerárquica: Épicas y MVP

### Épica 1 (E1): Gestión y Autenticación de Usuarios (MVP)
* **Descripción:** Permitir el registro, autenticación y gestión básica de perfiles de usuarios para controlar el acceso a la membresía.

### Épica 2 (E2): Procesamiento de Pagos y Suscripciones (MVP)
* **Descripción:** Implementar la pasarela de pagos para el cobro recurrence, renovación y cancelación de planes de membresía.

### Épica 3 (E3): Administración y Reportes (Post-MVP)
* **Descripción:** Panel administrativo para métricas de retención, cancelaciones e historial de miembros.

---

## 2. Historias de Usuario (User Stories) y Estimación

| ID | Historia de Usuario | Prioridad (MoSCoW) | Story Points (Fibonacci) |
|---|---|---|---|
| **HU-01** | Como **usuario**, quiero **registrarme en la plataforma con mi correo y contraseña** para **crear una cuenta de membresía**. | Must Have | 3 |
| **HU-02** | Como **usuario**, quiero **iniciar sesión de forma segura** para **acceder a mis beneficios de miembro**. | Must Have | 2 |
| **HU-03** | Como **cliente**, quiero **seleccionar un plan de membresía (mensual/anual)** para **realizar el pago correspondientes**. | Must Have | 5 |
| **HU-04** | Como **sistema**, quiero **enviar una notificación por correo al vencer la suscripción** para **recordar la renovación al usuario**. | Should Have | 3 |
| **HU-05** | Como **administrador**, quiero **ver un reporte de miembros activos** para **analizar el estado del negocio**. | Could Have | 5 |

---

## 3. Criterios de Priorización (Marco MoSCoW)

* **Must Have (Imprescindible):** Funcionalidades nucleares sin las cuales el producto no puede operar en producción (HU-01, HU-02, HU-03).
* **Should Have (Debería tener):** Características importantes que agregan alto valor pero no bloquean el lanzamiento inicial (HU-04).
* **Could Have (Podría tener):** Mejoras operativas o reportes para etapas posteriores (HU-05).
* **Won't Have (No tendrá por ahora):** Funciones fuera del alcance de la versión actual (ej. autenticación mediante redes sociales).

---

## 4. Reglas de Negocio Asociadas

1. **RN-01 (Única Cuenta):** Un correo electrónico solo puede estar asociado a una cuenta activa a la vez.
2. **RN-02 (Vencimiento y Gracia):** Si un pago falla, la membresía entra en un periodo de gracia de 3 días antes de suspender el acceso.
3. **RN-03 (Formatos de Contraseña):** Toda contraseña debe tener una longitud mínima de 8 caracteres, al menos un número y un carácter especial.
4. **RN-04 (Manejo de Reembolsos):** Las cancelaciones hechas dentro de las primeras 48 horas tras el cobro aplican para reembolso automático.
