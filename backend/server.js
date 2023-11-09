const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'tu_host',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos',
});

app.post('/registro', (req, res) => {
  const { usuario, contrasena } = req.body;

  db.query('INSERT INTO Usuarios (nombre_usuario, contrasena) VALUES (?, ?)', [usuario, contrasena], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al registrar usuario');
    } else {
      res.status(200).send('Usuario registrado exitosamente');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor backend en el puerto ${port}`);
});
