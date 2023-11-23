const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg')
const cors = require('cors');
const e = require('express');

const app = express();
app.disable("x-powered-by")
const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

const port = 3002;

app.use(bodyParser.json());
app.use(cors(corsOptions))

const db = new Client({
  user: 'postgres',
  password: '123456',
  host: 'localhost',
  database: 'postgres'
})


// Ruta para manejar las solicitudes GET relacionadas con las quejas
app.get('/quejas/:dni', async (req, res) => {
  const dni = req.params.dni;

  try {
    // Hacer la solicitud al servidor externo desde el servidor backend
    const url = `https://api-reclamos.onrender.com/quejas/${dni}`;
    const respuesta = await axios.get(url);

    res.json(respuesta.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor al obtener quejas externas' });
  }
});



app.post('/registro', (req, res) => {
  const { validar, usuario, contrasenia } = req.body;
  //const query = 'INSERT INTO users (usuario, contrasenia, validar) VALUES ($1, $2, $3)';
  console.log('Datos recibidos: ', {validar, usuario, contrasenia})
  //const values = 
  // Utiliza placeholders de tipo $1, $2, $3 en lugar de ? para PostgreSQL
  db.query('INSERT INTO users (validar, usuario, contrasenia) VALUES ($1, $2, $3)', [validar, usuario, contrasenia], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al registrar usuario');
    } else {
      res.status(200).send('Usuario registrado exitosamente');
    }
  });
});



app.post('/login', async (req, res) => {
  const { usuario, contrasenia } = req.body;

  try {
    // Utiliza una consulta preparada para evitar ataques de SQL injection
    const query = 'SELECT * FROM users WHERE usuario = $1 AND contrasenia = $2';
    const result = await db.query(query, [usuario, contrasenia]);

    if (result.rows.length > 0) {
      // Usuario y contraseña válidos
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } else {
      // Usuario o contraseña incorrectos
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend en el puerto ${port}`);
});

