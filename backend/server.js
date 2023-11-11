const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.disable("x-powered-by")
const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

const port = 3001;

app.use(bodyParser.json());
app.use(cors(corsOptions))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'autoconsultadb',
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
