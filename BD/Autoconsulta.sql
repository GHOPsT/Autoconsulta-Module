CREATE DATABASE autoconsultadb;
CREATE TABLE users (
    usuario VARCHAR(50),
    contrasenia VARCHAR(50) UNIQUE,
    validar INT PRIMARY KEY
);
CREATE TABLE data_user_pn (
    dni INT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fechan DATE,
    telefono INT,
    correo VARCHAR(50),
    departamento VARCHAR(50),
    provincia VARCHAR(50),
    distrito VARCHAR(50),
    validar INT,
    FOREIGN KEY (validar) REFERENCES users(validar)
);
CREATE TABLE data_user_pj (
    ruc INT PRIMARY KEY,
    empresa VARCHAR(100),
    relegal VARCHAR(100),
    correo VARCHAR(50),
    direccion VARCHAR(255),
    departamento VARCHAR(50),
    provincia VARCHAR(50),
    distrito VARCHAR(50),
    validar INT,
    FOREIGN KEY (validar) REFERENCES users(validar)
);
