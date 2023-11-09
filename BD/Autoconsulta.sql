CREATE DATABASE AutoconsultaBD;
USE AutoconsultaBD;
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(50) NOT NULL
);
CREATE TABLE DatosUsuariosPJ (
    ruc VARCHAR(15) PRIMARY KEY,
    empresa VARCHAR(100) NOT NULL,
    relegal VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    departamento VARCHAR(50),
    provincia VARCHAR(50),
    distrito VARCHAR(50),
    id_persona INT,
    FOREIGN KEY (id_persona) REFERENCES Usuarios(id_usuario)
);
CREATE TABLE DatosUsuariosPN (
    dni VARCHAR(15) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fechan DATE,
    telefono VARCHAR(15),
    correo VARCHAR(50) NOT NULL,
    departamento VARCHAR(50),
    provincia VARCHAR(50),
    distrito VARCHAR(50),
    id_persona INT,
    FOREIGN KEY (id_persona) REFERENCES Usuarios(id_usuario)
);