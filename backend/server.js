const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg')
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

const fs = require('fs').promises;  // Asegúrate de tener .promises para acceder a las funciones asíncronas
const fsSync = require('fs');  // Esto es para operaciones síncronas

const { error, log } = require('console');

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


const logError = (error) => {
  const logFilePath = './error-log.txt';
  const errorMessage = `${new Date().toISOString()}: ${error.stack}\n`;

  // Escribe el mensaje de error en el archivo de registro
  fsSync.appendFile(logFilePath, errorMessage, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo de registro:', err);
    }
  });
};

const logApiInfo = async (info) => {
  try {
    const logFilePath = './api-log.txt';
    // Agregar un timestamp al log
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${info}\n`;

    // Escribir en el archivo
    await fs.appendFile(logFilePath, logMessage);
    console.log('Log de API externa registrado con éxito.');
  } catch (err) {
    console.error('Error al escribir en el archivo de log:', err);
  }
};

const logSuccess = (event) => {
  const logFilePath = './success-log.txt';
  // Agregar un timestamp al log
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] Success: ${event}\n`;

  // Escribir en el archivo
  fsSync.appendFileSync(logFilePath, logMessage);  // Aquí usamos operación síncrona
  console.log('Log de éxito registrado con éxito.');
};

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
      INSERT INTO queja (dni, id_queja, fecha_queja, prod_serv_queja, queja, comentario_queja, estado_queja) 
      VALUES ${marcadores} 
      ON CONFLICT (id_queja) DO UPDATE SET
        dni=EXCLUDED.dni,
        fecha_queja=EXCLUDED.fecha_queja,
        prod_serv_queja=EXCLUDED.prod_serv_queja,
        queja=EXCLUDED.queja,
        comentario_queja=EXCLUDED.comentario_queja,
        estado_queja=EXCLUDED.estado_queja
    `;

    await db.query(query, datosAInsertar.flat());

     // Log de éxito
     logSuccess('Inserción de quejas en la base de datos completada con éxito.');

    return { success: true, message: 'Datos insertados o actualizados correctamente' };
  } catch (error) {
    console.error('Error al insertar quejas en la base de datos:', error);
    logError(error);
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

    // Log de éxito
    logSuccess(`Obtención de quejas por DNI ${dni} completada con éxito.`);

    return { quejas: result.rows }; // Devuelve el array de quejas encontradas
  } catch (error) {
    console.error('Error en obtenerQuejasPorDni:', error);
    logError(error);
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
    
      // Log de la API externa
      logApiInfo(`Respuesta de la API externa para cliente ${dni}: ${JSON.stringify(respuesta.data)}`);

      // Log de éxito después de obtener datos de la API externa
      logSuccess(`Obtención de quejas de la API externa para cliente ${dni} completada con éxito.`);
  
    } catch (error) {
      console.error('Error al obtener quejas de la API externa:', error);
      logError(error);
      return res.status(500).json({ success: false, message: 'Error al obtener quejas de la API externa' });
    }
    

    // Verificar que quejas sea un array antes de llamar a insertarQuejasEnBD
    if (Array.isArray(quejas)) {
      // Obtener quejas existentes por el DNI
      let existingQuejas;
      try {
        existingQuejas = await obtenerQuejasPorDni(dni);

        // Log de éxito después de obtener quejas existentes de la base de datos
        logSuccess(`Obtención de quejas existentes de la base de datos para cliente ${dni} completada con éxito.`);

      } catch (error) {
        console.error('Error al obtener quejas existentes de la base de datos:', error);
        
        return res.status(500).json({ success: false, message: 'Error al obtener quejas existentes de la base de datos' });
      }

      // Filtrar quejas para evitar duplicados
      const existingQuejaIds = existingQuejas.quejas.map(q => q.id_queja);

      // Insertar quejas nuevas en la base de datos
      const resultadoInsercion = await insertarQuejasEnBD(quejas, dni, existingQuejaIds);

      if (resultadoInsercion.success) {

        // Log de éxito después de la inserción
        logSuccess(`Inserción de quejas en la base de datos para cliente ${dni} completada con éxito.`);

        res.json({ success: true, message: 'Datos insertados o actualizados correctamente' });
      } else {
        res.json({ success: false, message: resultadoInsercion.message });
      }
    } else {
      res.status(500).json({ success: false, message: 'La respuesta de la API externa no es válida' });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    logError(error)
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
      logError(error)
      return res.status(500).json({ success: false, message: 'Error al obtener quejas' });
    }

    // Log de éxito después de obtener quejas existentes
    logSuccess(`Obtención de quejas existentes para cliente ${dni} completada con éxito.`);

    // Devolver las quejas encontradas
    res.json({ success: true, quejas: result.quejas });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    logError(error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});


// RECLAMOS 

// Endpoint para insertar reclamos
app.get('/insertar-reclamos/:dni', async (req, res) => {
  try {
    const dni = req.params.dni;

    // Realizar la solicitud a la API externa siempre, independientemente de si hay reclamos existentes
    const url = `https://api-reclamos.onrender.com/reclamos/cliente/${dni}`;
    let reclamos;
    try {
      const respuesta = await axios.get(url);
      reclamos = respuesta.data;

      // Log de la API externa
      logApiInfo(`Respuesta de la API externa para cliente ${dni}: ${JSON.stringify(respuesta.data)}`);

      // Log de éxito después de obtener datos de la API externa
      logSuccess(`Inserción de reclamos de la API externa para cliente ${dni} completada con éxito.`);
    } catch (error) {
      console.error('Error al obtener reclamos de la API externa:', error);
      logError(error);
      return res.status(500).json({ success: false, message: 'Error al obtener reclamos de la API externa' });
    }

    // Verificar que reclamos sea un array antes de llamar a insertarReclamosEnBD
    if (Array.isArray(reclamos)) {
      // Obtener reclamos existentes por el DNI
      let existingReclamos;
      try {
        existingReclamos = await obtenerReclamosPorDni(dni);

        // Log de éxito después de obtener reclamos existentes de la base de datos
        logSuccess(`Inserción de reclamos existentes de la base de datos para cliente ${dni} completada con éxito.`);
      } catch (error) {
        console.error('Error al obtener reclamos existentes de la base de datos:', error);

        return res.status(500).json({
          success: false,
          message: 'Error al obtener reclamos existentes de la base de datos'
        });
      }

      // Filtrar reclamos para evitar duplicados
      const existingReclamoIds = existingReclamos.reclamos.map(r => r.id_reclamo);

      // Insertar reclamos nuevos en la base de datos
      const resultadoInsercion = await insertarReclamosEnBD(reclamos, dni, existingReclamoIds);

      if (resultadoInsercion.success) {

        // Log de éxito después de la inserción
        logSuccess(`Inserción de reclamos en la base de datos para cliente ${dni} completada con éxito.`);

        res.json({ success: true, message: 'Datos insertados o actualizados correctamente' });
      } else {
        res.json({ success: false, message: resultadoInsercion.message });
      }
    } else {
      res.status(500).json({ success: false, message: 'La respuesta de la API externa no es válida' });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    logError(error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});


// Función para insertar reclamos en la base de datos
const insertarReclamosEnBD = async (reclamos, dniCliente, existingReclamoIds) => {
  try {
    // Filtrar reclamos para obtener solo los que no existen en la base de datos
    const nuevosReclamos = reclamos ? reclamos.filter((reclamo) => !existingReclamoIds.includes(reclamo.id_reclamo) ) : [];

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
      reclamo.area_asociada,
      reclamo.tipo_reclamo,
    ]);

    // Crear dinámicamente los marcadores de posición en la consulta
    const marcadores = datosAInsertar.map((_, i) => `($${i * 11 + 1}, $${i * 11 + 2}, $${i * 11 + 3}, $${i * 11 + 4}, $${i * 11 + 5}, $${i * 11 + 6}, $${i * 11 + 7}, $${i * 11 + 8}, $${i * 11 + 9} , $${i * 11 + 10}, $${i * 11 + 11})`).join(', ');

    // Realizar la inserción en la base de datos
    const query = `
    INSERT INTO reclamo (dni, id_reclamo, fecha_reclamo, reclamo, comentario_reclamo, monto, estado_reclamo, prod_serv_reclamo, fecha_respuesta_reclamo, area_asignada_reclamo, tipo_reclamo) 
    VALUES ${marcadores}
    ON CONFLICT (id_reclamo) DO UPDATE 
    SET dni=EXCLUDED.dni, 
        fecha_reclamo=EXCLUDED.fecha_reclamo,
        reclamo=EXCLUDED.reclamo,
        comentario_reclamo=EXCLUDED.comentario_reclamo,
        monto=EXCLUDED.monto,
        estado_reclamo=EXCLUDED.estado_reclamo,
        prod_serv_reclamo=EXCLUDED.prod_serv_reclamo,
        fecha_respuesta_reclamo=EXCLUDED.fecha_respuesta_reclamo,
        area_asignada_reclamo=EXCLUDED.area_asignada_reclamo,
        tipo_reclamo=EXCLUDED.tipo_reclamo
`;

    await db.query(query, datosAInsertar.flat());

    // Log de éxito
    logSuccess('Inserción de reclamos en la base de datos completada con éxito.');

    return { success: true, message: 'Datos insertados correctamente' };
  } catch (error) {
    console.error('Error al insertar reclamos en la base de datos:', error);
    logError(error);

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
  const query = 'SELECT * FROM reclamo WHERE dni = $1';
  try {
    const result = await db.query(query, [dni]);

    // Log de éxito
    logSuccess(`Obtención de reclamos por DNI ${dni} completada con éxito.`);

    return { reclamos: result.rows }; // Devuelve el array de reclamos encontrados
  } catch (error) {
    console.error('Error en obtenerReclamosPorDni:', error);
    logError(error)
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
    if (!result.reclamos) {
      console.error('La función obtenerReclamosPorDni no devolvió un array:', result);
      logError(error)
      return res.status(500).json({ success: false, message: 'Error al obtener reclamos' });
    }

    // Log de éxito después de obtener quejas existentes
    logSuccess(`Obtención de reclamos existentes para cliente ${dni} completada con éxito.`);


    // Devolver las quejas encontradas
    res.json({ success: true, reclamos: result.reclamos });
  } catch (error) {
    console.error('Error al procesar la solicitud del reclamo:', error);
    logError(error)
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});



// SOLICITUDES


// Endpoint para insertar solicitudes
app.get('/insertar-solicitudes/:dni', async (req, res) => {
  try {
    const dni = req.params.dni;

    // Realizar la solicitud a la API externa siempre, independientemente de si hay solicitudes existentes
    const url = `https://api-reclamos.onrender.com/solicitudes/cliente/${dni}`;
    let solicitudes;
    try {
      const respuesta = await axios.get(url);
      solicitudes = respuesta.data;

      // Log de la API externa
      logApiInfo(`Respuesta de la API externa para cliente ${dni}: ${JSON.stringify(respuesta.data)}`);

      // Log de éxito después de obtener datos de la API externa
      logSuccess(`Inserción de solicitudes de la API externa para cliente ${dni} completada con éxito.`);
    } catch (error) {
      console.error('Error al obtener solicitudes de la API externa:', error);
      logError(error);
      return res.status(500).json({ success: false, message: 'Error al obtener solicitudes de la API externa' });
    }

    // Verificar que solicitudes sea un array antes de llamar a insertarSolicitudesEnBD
    if (Array.isArray(solicitudes)) {
      // Obtener solicitudes existentes por el DNI
      let existingSolicitudes;
      try {
        existingSolicitudes = await obtenerSolicitudesPorDni(dni);

        // Log de éxito después de obtener solicitudes existentes de la base de datos
        logSuccess(`Inserción de solicitudes existentes de la base de datos para cliente ${dni} completada con éxito.`);
      } catch (error) {
        console.error('Error al obtener solicitudes existentes de la base de datos:', error);

        return res.status(500).json({
          success: false,
          message: 'Error al obtener solicitudes existentes de la base de datos'
        });
      }

      // Filtrar solicitudes para evitar duplicados
      const existingSolicitudIds = existingSolicitudes.solicitudes.map(s => s.id_solicitud);

      // Insertar solicitudes nuevas en la base de datos
      const resultadoInsercion = await insertarSolicitudesEnBD(solicitudes, dni, existingSolicitudIds);

      if (resultadoInsercion.success) {

        // Log de éxito después de la inserción
        logSuccess(`Inserción de solicitudes en la base de datos para cliente ${dni} completada con éxito.`);

        res.json({ success: true, message: 'Datos insertados o actualizados correctamente' });
      } else {
        res.json({ success: false, message: resultadoInsercion.message });
      }
    } else {
      res.status(500).json({ success: false, message: 'La respuesta de la API externa no es válida' });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    logError(error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Función para insertar solicitudes en la base de datos
const insertarSolicitudesEnBD = async (solicitudes, dniCliente, existingSolicitudIds) => {
  try {
    // Filtrar solicitudes para obtener solo las que no existen en la base de datos
    const nuevasSolicitudes = solicitudes ? solicitudes.filter((solicitud) => !existingSolicitudIds.includes(solicitud.id_solicitud)) : [];

    // Mapear las nuevas solicitudes para la inserción
    const datosAInsertar = nuevasSolicitudes.map((solicitud) => [
      dniCliente,
      solicitud.id_solicitud,
      solicitud.fecha_solicitud,
      solicitud.tipo_bien_contratado,
      solicitud.tipo_solicitud,
      solicitud.detalle_solicitud,
      solicitud.peticion_cliente,
      solicitud.estado,
      solicitud.area_asociada,
    ]);

    // Crear dinámicamente los marcadores de posición en la consulta
    const marcadores = datosAInsertar.map((_, i) => `($${i * 9 + 1}, $${i * 9 + 2}, $${i * 9 + 3}, $${i * 9 + 4}, $${i * 9 + 5}, $${i * 9 + 6}, $${i * 9 + 7}, $${i * 9 + 8}, $${i * 9 + 9})`).join(', ');



    // Realizar la inserción en la base de datos
    const query = `
      INSERT INTO solicitud (dni, id_solicitud, fecha_solicitud, prod_serv_solicitud, tipo_solicitud, solicitud, comentario_solicitud, estado_solicitud, area_asignada_solicitud) 
      VALUES ${marcadores} 
      ON CONFLICT (id_solicitud) DO UPDATE SET
        dni=EXCLUDED.dni,
        fecha_solicitud=EXCLUDED.fecha_solicitud,
        prod_serv_solicitud=EXCLUDED.prod_serv_solicitud,
        tipo_solicitud=EXCLUDED.tipo_solicitud,
        solicitud=EXCLUDED.solicitud,
        comentario_solicitud=EXCLUDED.comentario_solicitud,
        estado_solicitud=EXCLUDED.estado_solicitud,
        area_asignada_solicitud=EXCLUDED.area_asignada_solicitud
`;

    await db.query(query, datosAInsertar.flat());

    // Log de éxito
    logSuccess('Inserción de solicitudes en la base de datos completada con éxito.');

    return { success: true, message: 'Datos insertados correctamente' };
  } catch (error) {
    console.error('Error al insertar solicitudes en la base de datos:', error);
    logError(error);

    if (error.code === '23505') {
      return { success: false, message: 'Los datos ya existen' };
    } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return { success: false, message: 'Referencia a una fila inexistente' };
    } else {
      return { success: false, message: 'Error al insertar solicitudes en la base de datos' };
    }
  }
};

// Función para obtener solicitudes por DNI
const obtenerSolicitudesPorDni = async (dni) => {
  const query = 'SELECT * FROM solicitud WHERE dni = $1';
  try {
    const result = await db.query(query, [dni]);

    // Log de éxito
    logSuccess(`Obtención de solicitudes por DNI ${dni} completada con éxito.`);

    return { solicitudes: result.rows }; // Devuelve el array de solicitudes encontradas
  } catch (error) {
    console.error('Error en obtenerSolicitudesPorDni:', error);
    logError(error)
    return { error: true, message: 'Error al obtener solicitudes por DNI' };
  }
};


// Agrega una nueva ruta para obtener solicitudes por DNI
app.get('/clientes/solicitudes/:dni', async (req, res) => {
  try {
    const dni = req.params.dni;

    // Llama a la función para obtener reclamos por DNI
    const result = await obtenerSolicitudesPorDni(dni);

    // Verifica si la consulta fue exitosa
    if (!result.solicitudes) {
      console.error('La función obtenerSolicitudesPorDni no devolvió un array:', result);
      logError(error)
      return res.status(500).json({ success: false, message: 'Error al obtener solicitudes' });
    }

    // Log de éxito después de obtener quejas existentes
    logSuccess(`Obtención de solicitudes existentes para cliente ${dni} completada con éxito.`);


    // Devolver las quejas encontradas
    res.json({ success: true, solicitudes: result.solicitudes });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    logError(error)
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});






app.get('/clientes/general/:dni', async (req, res) => {
  try {
    const dni = req.params.dni;

    // Inicializar el arreglo de informacionGeneral
    let informacionGeneral = [];

    // Obtener reclamos por el DNI del cliente
    const reclamosResult = await obtenerReclamosPorDni(dni);
    if (reclamosResult.reclamos && reclamosResult.reclamos.length > 0) {
      informacionGeneral = [...informacionGeneral, ...reclamosResult.reclamos.map(reclamo => ({ ...reclamo, tipo: 'Reclamo' }))];
    }

    // Obtener solicitudes por el DNI del cliente
    const solicitudesResult = await obtenerSolicitudesPorDni(dni);
    if (solicitudesResult.solicitudes && solicitudesResult.solicitudes.length > 0) {
      informacionGeneral = [...informacionGeneral, ...solicitudesResult.solicitudes.map(solicitud => ({ ...solicitud, tipo: 'Solicitud' }))];
    }

    // Obtener quejas por el DNI del cliente
    const quejasResult = await obtenerQuejasPorDni(dni);
    if (quejasResult.quejas && quejasResult.quejas.length > 0) {
      informacionGeneral = [...informacionGeneral, ...quejasResult.quejas.map(queja => ({ ...queja, tipo: 'Queja' }))];
    }

    // Verificar si al menos una de las consultas fue exitosa y devolvió información
    if (informacionGeneral.length > 0) {
      // Log de éxito después de obtener información
      logSuccess(`Obtención de información general para cliente ${dni} completada con éxito.`);

      // Devuelve la información general
      res.json({ success: true, informacionGeneral });
    } else {
      // Manejar caso donde ninguna consulta devolvió información
      console.error('Ninguna de las consultas devolvió información.');
      res.json({ success: true, informacionGeneral: [] });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    logError(error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});






app.post('/registro', (req, res) => {
  const { dni, usuario, contrasenia } = req.body;
  const query = 'INSERT INTO users (dni, usuario, contrasenia) VALUES ($1, $2, $3)';

  db.query(query, [dni, usuario, contrasenia], (err) => {
    if (err) {
      console.error(err);
      logError(err)
      res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.message });
    } else {
      // Log de éxito después de la respuesta exitosa
      logSuccess('Registro de usuario exitoso');
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

    if (result.rows.length > 0) {
      // Verifica la contraseña utilizando algún método de hash, como bcrypt
      const user = result.rows[0];
      if (user.contrasenia === contrasenia) {
        // Usuario y contraseña válidos
        console.log("Inicio de sesión exitoso");

        // Log de éxito
        logSuccess('Inicio de sesión exitoso');

        res.status(200).json({ success: true, mensaje: 'Inicio de sesión exitoso' });
      } else {
        // Contraseña incorrecta
        console.log("Credenciales incorrectas");

         // Log de error
         logError('Credenciales incorrectas');

        res.status(401).json({ success: false, mensaje: 'Credenciales incorrectas' });
      }
    } else {
      // Usuario no encontrado
      console.log("Usuario no encontrado");

      // Log de error
      logError('Usuario no encontrado');

      res.status(401).json({ success: false, mensaje: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    logError(error)
    res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
  }
});


app.listen(port, () => {
  console.log(`Servidor backend en el puerto ${port}`);
});

