-- Esquema de base de datos para FitControl (versión web/MySQL)
-- Basado en el modelo del prototipo de escritorio (WinForms/SQL Server) del repositorio original,
-- adaptado a MySQL para el backend de la API.

CREATE DATABASE IF NOT EXISTS fitcontrol;
USE fitcontrol;

CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario    VARCHAR(50) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL, -- aquí se guarda el HASH (bcrypt), nunca texto plano
    rol        VARCHAR(20) NOT NULL DEFAULT 'Empleado' -- ej: Admin, Empleado
);

CREATE TABLE IF NOT EXISTS Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre     VARCHAR(100) NOT NULL,
    apellido   VARCHAR(100) NOT NULL,
    telefono   VARCHAR(20),
    direccion  VARCHAR(200),
    estado     VARCHAR(20) NOT NULL DEFAULT 'Activo' -- Activo / Inactivo
);

CREATE TABLE IF NOT EXISTS Planes (
    id_plan     INT AUTO_INCREMENT PRIMARY KEY,
    nombre_plan VARCHAR(100) NOT NULL,
    precio      DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS Membresias (
    id_membresia INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATE NOT NULL,
    fecha_fin    DATE NOT NULL,
    estado       VARCHAR(20) NOT NULL DEFAULT 'Activa',
    id_cliente   INT NOT NULL,
    id_plan      INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_plan) REFERENCES Planes(id_plan)
);
