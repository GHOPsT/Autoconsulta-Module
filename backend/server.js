const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg')
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
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

// QUEJAS 
const insertarQuejasEnBD = async (quejas, dniCliente, existingQuejaIds) => {
  try {
    // Verificar que las quejas estén definidas y sean un array
    const nuevasQuejas = quejas ? quejas.filter((queja) => !existingQuejaIds.includes(queja.id_queja)) : [];

    // Mapear las nuevas quejas para la inserción
    const datosAInsertar = nuevasQuejas.map((queja) => [
      dniCliente,
      queja.id_queja,
      queja.fecha_queja,
      queja.tipo_bien_contratado,
      queja.detalle_queja,
      queja.peticion_cliente,
      queja.estado,
    ]);

    // Crear dinámicamente los marcadores de posición en la consulta
    const marcadores = datosAInsertar.map((_, i) => `($${i * 7 + 1}, $${i * 7 + 2}, $${i * 7 + 3}, $${i * 7 + 4}, $${i * 7 + 5}, $${i * 7 + 6}, $${i * 7 + 7})`).join(', ');

    // Realizar la inserción en la base de datos
    const query = `
      INSERT INTO queja (dni, id_queja, fecha_queja, prod_serv, queja, comentario, estado) 
      VALUES ${marcadores} 
      ON CONFLICT (id_queja) DO UPDATE SET
        dni=EXCLUDED.dni,
        fecha_queja=EXCLUDED.fecha_queja,
        prod_serv=EXCLUDED.prod_serv,
        queja=EXCLUDED.queja,
        comentario=EXCLUDED.comentario,
        estado=EXCLUDED.estado
    `;

    await db.query(query, datosAInsertar.flat());

    return { success: true, message: 'Datos insertados o actualizados correctamente' };
  } catch (error) {
    console.error('Error al insertar quejas en la base de datos:', error);

    if (error.code === '23505') {
      return { success: false, message: 'Los datos ya existen' };
    } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return { success: false, message: 'Referencia a una fila inexistente' };
    } else {
      return { success: false, message: 'Error al insertar quejas en la base de datos' };
    }
  }
};

const obtenerQuejasPorDni = async (dni) => {
  const query = 'SELECT * FROM queja WHERE dni = $1';
  try {
    const result = await db.query(query, [dni]);
    return { quejas: result.rows }; // Devuelve el array de quejas encontradas
  } catch (error) {
    console.error('Error en obtenerQuejasPorDni:', error);
    return { error: true, message: 'Error al obtener quejas por DNI' };
  }
};

app.get('/insertar-quejas/:dni', async (req, res) => {
  try {
    const dni = req.params.dni;

    // Realizar la solicitud a la API externa siempre, independientemente de si hay quejas existentes
    const url = `https://api-reclamos.onrender.com/quejas/cliente/${dni}`;
    let quejas;
    try {
      const respuesta = await axios.get(url);
      quejas = respuesta.data;
    } catch (error) {
      console.error('Error al obtener quejas de la API externa:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener quejas de la API externa' });
    }

    // Verificar que quejas sea un array antes de llamar a insertarQuejasEnBD
    if (Array.isArray(quejas)) {
      // Obtener quejas existentes por el DNI
      let existingQuejas;
      try {
        existingQuejas = await obtenerQuejasPorDni(dni);
      } catch (error) {
        console.error('Error al obtener quejas existentes de la base de datos:', error);
        return res.status(500).json({ success: false, message: 'Error al obtener quejas existentes de la base de datos' });
      }

      // Filtrar quejas para evitar duplicados
      const existingQuejaIds = existingQuejas.quejas.map(q => q.id_queja);

      // Insertar quejas nuevas en la base de datos
      const resultadoInsercion = await insertarQuejasEnBD(quejas, dni, existingQuejaIds);

      if (resultadoInsercion.success) {
        res.json({ success: true, message: 'Datos insertados o actualizados correctamente' });
      } else {
        res.json({ success: false, message: resultadoInsercion.message });
      }
    } else {
      res.status(500).json({ success: false, message: 'La respuesta de la API externa no es válida' });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});


// Ruta para obtener las quejas de un cliente por DNI
app.get('/clientes/quejas/:dni', async (req, res) => {
  try {
    const dni = req.params.dni;

    // Obtener quejas existentes por el DNI
    const result = await obtenerQuejasPorDni(dni);

    // Verificar si la consulta fue exitosa
    if (!result.quejas) {
      console.error('La función obtenerQuejasPorDni no devolvió un array:', result);
      return res.status(500).json({ success: false, message: 'Error al obtener quejas' });
    }

    // Devolver las quejas encontradas
    res.json({ success: true, quejas: result.quejas });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});


// RECLAMOS 

// Endpoint para insertar reclamos
app.get('/insertar-reclamos/:dni', async (req, res) => {
  try {
    const dni = req.params.dni;

    // Obtener reclamos existentes por el DNI
    let existingReclamos;
    try {
      existingReclamos = await obtenerReclamosPorDni(dni);
    } catch (error) {
      console.error('Error al obtener reclamos existentes de la base de datos:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener reclamos existentes de la base de datos' });
    }

    // Verificar si los reclamos ya existen en la base de datos
    if (!existingReclamos.reclamos) {
      console.error('La función obtenerReclamosPorDni no devolvió un array:', existingReclamos);
      return res.status(500).json({ success: false, message: 'Error en la obtención de reclamos existentes' });
    }

    // Filtrar reclamos para evitar duplicados
    const existingReclamoIds = existingReclamos.reclamos.map(r => r.id_reclamo);

    let reclamos;

    // Verificar si hay reclamos nuevos para insertar
    if (existingReclamos.reclamos.length === 0) {
      // Realizar la solicitud a la API externa solo si no hay reclamos existentes en la base de datos
      const url = `https://api-reclamos.onrender.com/reclamos/cliente/${dni}`;
      try {
        const respuesta = await axios.get(url);
        reclamos = respuesta.data;
      } catch (error) {
        console.error('Error al obtener reclamos de la API externa:', error);
        return res.status(500).json({ success: false, message: 'Error al obtener reclamos de la API externa' });
      }
    }

    // Insertar reclamos nuevos en la base de datos
    const resultadoInsercion = await insertarReclamosEnBD(reclamos, dni, existingReclamoIds);

    if (resultadoInsercion.success) {
      res.json({ success: true, message: 'Datos insertados o actualizados correctamente' });
    } else {
      res.json({ success: false, message: resultadoInsercion.message });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Función para insertar reclamos en la base de datos
const insertarReclamosEnBD = async (reclamos, dniCliente, existingReclamoIds) => {
  try {
    // Filtrar reclamos para obtener solo los que no existen en la base de datos
    const nuevosReclamos = reclamos.filter(
      (reclamo) => !existingReclamoIds.includes(reclamo.id_reclamo)
    );

    // Verificar si hay nuevos reclamos para insertar
    if (nuevosReclamos.length === 0) {
      return { success: true, message: 'No hay nuevos datos para insertar' };
    }

    // Mapear los nuevos reclamos para la inserción
    const datosAInsertar = nuevosReclamos.map((reclamo) => [
      dniCliente,
      reclamo.id_reclamo,
      reclamo.fecha_reclamo,
      reclamo.detalle_reclamo,
      reclamo.peticion_cliente,
      reclamo.monto_reclamado,
      reclamo.estado,
      reclamo.tipo_bien_contratado,
      reclamo.fecha_respuesta,
    ]);

    // Crear dinámicamente los marcadores de posición en la consulta
    const marcadores = datosAInsertar.map((_, i) => `($${i * 9 + 1}, $${i * 9 + 2}, $${i * 9 + 3}, $${i * 9 + 4}, $${i * 9 + 5}, $${i * 9 + 6}, $${i * 9 + 7}, $${i * 9 + 8}, $${i * 9 + 9})`).join(', ');

    // Realizar la inserción en la base de datos
    const query = `
      INSERT INTO reclamos (dni, id_reclamo, fecha_reclamo, reclamo, peticion_cliente, monto_reclamado, estado, tipo_bien_contratado, fecha_respuesta) 
      VALUES ${marcadores} 
      ON CONFLICT (id_reclamo) DO UPDATE SET
        dni=EXCLUDED.dni,
        fecha_reclamo=EXCLUDED.fecha_reclamo,
        reclamo=EXCLUDED.reclamo,
        peticion_cliente=EXCLUDED.peticion_cliente,
        monto_reclamado=EXCLUDED.monto_reclamado,
        estado=EXCLUDED.estado,
        tipo_bien_contratado=EXCLUDED.tipo_bien_contratado,
        fecha_respuesta=EXCLUDED.fecha_respuesta
    `;

    await db.query(query, datosAInsertar.flat());

    return { success: true, message: 'Datos insertados correctamente' };
  } catch (error) {
    console.error('Error al insertar reclamos en la base de datos:', error);

    if (error.code === '23505') {
      return { success: false, message: 'Los datos ya existen' };
    } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return { success: false, message: 'Referencia a una fila inexistente' };
    } else {
      return { success: false, message: 'Error al insertar reclamos en la base de datos' };
    }
  }
};

// Función para obtener reclamos por DNI
const obtenerReclamosPorDni = async (dni) => {
  const query = 'SELECT * FROM reclamos WHERE dni = $1';
  try {
    const result = await db.query(query, [dni]);
    return { reclamos: result.rows }; // Devuelve el array de reclamos encontrados
  } catch (error) {
    console.error('Error en obtenerReclamosPorDni:', error);
    return { error: true, message: 'Error al obtener reclamos por DNI' };
  }
};

// Agrega una nueva ruta para obtener reclamos por DNI
app.get('/clientes/reclamos/:dni', async (req, res) => {
  try {
    const dni = req.params.dni;

    // Llama a la función para obtener reclamos por DNI
    const result = await obtenerReclamosPorDni(dni);

    // Verifica si la consulta fue exitosa
    if (!result.error) {
      res.json({ success: true, reclamos: result.reclamos });
    } else {
      res.status(500).json({ success: false, message: 'Error al obtener reclamos por DNI' });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});



// SOLICITUDES



app.post('/registro', (req, res) => {
  const { dni, usuario, contrasenia } = req.body;
  const query = 'INSERT INTO users (dni, usuario, contrasenia) VALUES ($1, $2, $3)';

  db.query(query, [dni, usuario, contrasenia], (err) => {
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

