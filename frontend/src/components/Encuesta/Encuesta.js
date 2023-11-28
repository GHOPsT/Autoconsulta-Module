import React, { useState } from 'react';
import Componente1 from '../Encuesta/Preg1';
import Componente2 from '../Encuesta/Preg2';
import Componente3 from '../Encuesta/Preg3';
import Componente4 from '../Encuesta/Preg4';
import SIM from '../../images/SIM.png';
import "./Encuesta.css";

const imageStyle = {
  width: '90px',
  height: 'auto',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
};

const Encuesta = () => {
  const [respuestas, setRespuestas] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: '',
  });

  const [mensaje, setMensaje] = useState('');

  const [estado, setEstado] = useState('inicio');

  const cambiarEstado = (nuevoEstado) => {
    setEstado(nuevoEstado);
    setRespuestas({
      pregunta1: '',
      pregunta2: '',
      pregunta3: '',
      pregunta4: '',
    });
    setMensaje('');
  };

  const guardarRespuestas = () => {
    if (!respuestas.pregunta1 || !respuestas.pregunta2 || !respuestas.pregunta4) {
      setMensaje('Por favor, llene los campos obligatorios');
    } else {
      setMensaje('Respuestas guardadas con éxito');
    }
  };

  const renderComponente = () => {
    switch (estado) {
      case 'inicio':
        return (
          <div className="Encuesta">
            <div className="presentacion" style={containerStyle}>
              <div className="image-container">
                <img src={SIM} alt="Imagen SIM" style={imageStyle} className="left-image" />
                <h1 className="lead text-center">Encuesta de Satisfacción del cliente</h1>
                <img src={SIM} alt="Imagen SIM" style={imageStyle} className="right-image" />
              </div>
            </div>
            <div style={containerStyle}>
              <br />
              <Componente1
                value={respuestas.pregunta1}
                onChange={(value) => setRespuestas({ ...respuestas, pregunta1: value })}
              />
              <br />
              <Componente2
                value={respuestas.pregunta2}
                onChange={(value) => setRespuestas({ ...respuestas, pregunta2: value })}
              />
              <br />
              <Componente3
                value={respuestas.pregunta3}
                onChange={(value) => setRespuestas({ ...respuestas, pregunta3: value })}
              />
              <br />
              <Componente4
                value={respuestas.pregunta4}
                onChange={(value) => setRespuestas({ ...respuestas, pregunta4: value })}
              />
              <br />
            </div>
            <br />
            <div className="Guardado" style={containerStyle}>
              <button onClick={guardarRespuestas}>Guardar respuestas</button>
              {mensaje && <p>{mensaje}</p>}
              <button onClick={() => cambiarEstado('otroEstado')}>Limpiar</button>
            </div>
          </div>
        );
      case 'otroEstado':
        return (
          <div>
            <p>Contestar encuesta</p>
            <button onClick={() => cambiarEstado('inicio')}>Encuesta</button>
          </div>
        );
      default:
        return null;
    }
  };

  return renderComponente();
};

export default Encuesta;
