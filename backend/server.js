const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.disable("x-powered-by")
const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type'],

    credentials: true,
};

const port = 3002;

app.use(cors(corsOptions))
app.use(express.json());

/*
const db = new Client({
  user: 'postgres',
  password: '123456',
  host: 'localhost',
  database: 'postgres'
})
*/

const db = new Client({
  user: 'postgres_user',
  password: 'iF6rIeogxJGoJh0H354FLxg3HNflzSi3',
  host: 'dpg-climsgcm411s73ds7iu0-a.oregon-postgres.render.com',
  database: 'autoconsulta_k0x5',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});


db.connect()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err.message);
  });


app.get('/pin', async (req, res) => {
  const result = await db.query('SELECT NOW()')
  return res.json(result.rows[0])
})

module.exports = Client;

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
  const query = 'INSERT INTO users (validar, usuario, contrasenia) VALUES ($1, $2, $3)';

  db.query(query, [validar, usuario, contrasenia], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.message });
    } else {
      res.status(200).json({ mensaje: 'Usuario registrado exitosamente' });
    }
  });
});


app.post('/login', async (req, res) => {
  const { usuario, contrasenia } = req.body;

  try {
    console.log('Cuerpo de la solicitud:', req.body);

    // Utiliza una consulta preparada para evitar ataques de SQL injection
    const query = 'SELECT * FROM users WHERE usuario = $1';
    const result = await db.query(query, [usuario]);
    console.log("A")

    if (result.rows.length > 0) {
      // Verifica la contraseña utilizando algún método de hash, como bcrypt
      const user = result.rows[0];
      if (user.contrasenia === contrasenia) {
        // Usuario y contraseña válidos
        console.log("Inicio de sesión exitoso");
        res.status(200).json({ success: true, mensaje: 'Inicio de sesión exitoso' });
      } else {
        // Contraseña incorrecta
        console.log("Credenciales incorrectas");
        res.status(401).json({ success: false, mensaje: 'Credenciales incorrectas' });
      }
    } else {
      // Usuario no encontrado
      console.log("Usuario no encontrado");
      res.status(401).json({ success: false, mensaje: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
  }
});


app.listen(port, () => {
  console.log(`Servidor backend en el puerto ${port}`);
});

