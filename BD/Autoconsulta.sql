CREATE TABLE users (
    usuario VARCHAR(50),
    contrasenia VARCHAR(50) UNIQUE,
    dni INT PRIMARY KEY CHECK (dni >= 10000000 AND dni <= 99999999)
);
CREATE TABLE detallesUser (
    dni INT CHECK (dni >= 10000000 AND dni <= 99999999),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fechan DATE,
    telefono INT,
    correo VARCHAR(50),
    departamento VARCHAR(50),
    provincia VARCHAR(50),
    distrito VARCHAR(50),
    FOREIGN KEY (dni) REFERENCES users(dni)
);
CREATE TABLE solicitud (
	dni INT,
	id_solicitud INT PRIMARY KEY,
	fecha_solicitud DATE,
	prod_serv VARCHAR(50),
	tipo_solicitud VARCHAR(50),
	solicitud VARCHAR (50),
	comentario VARCHAR (500),
	estado VARCHAR (20),
	FOREIGN KEY (dni) REFERENCES users(dni)
);
CREATE TABLE queja (
	dni INT,
	id_queja INT PRIMARY KEY,
	fecha_queja DATE,
	prod_serv VARCHAR (50),
	queja VARCHAR (50),
	comentario VARCHAR (500),
	estado VARCHAR (20),
	FOREIGN KEY (dni) REFERENCES users(dni)
);
CREATE TABLE reclamos (
	dni INT,
	id_reclamos INT PRIMARY KEY,
	fecha_reclamo DATE,
	reclamo VARCHAR (50),
	comentario VARCHAR (500),
	monto INT,
	estado VARCHAR (20),
	FOREIGN KEY (dni) REFERENCES users(dni)
);