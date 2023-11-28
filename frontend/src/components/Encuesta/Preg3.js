import React, { Component } from 'react';

class Componente3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respuesta: '',
    };
  }

  manejarRespuesta = (e) => {
    this.setState({ respuesta: e.target.value });
    this.props.onChange(e.target.value);
  };

  render() {
    const containerStyle = {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start', 
    };

    return (
      <div className='custom-container'>
      <div style={containerStyle}>
        <div className="pregunta" style={{ marginLeft: '10px' }}>
          <h2 className="text" style={{ color: '#0d1c78', textAlign: 'left' }}> 3. ¿Qué aspectos de nuestro servicio móvil cree que podríamos mejorar? (No obligatorio)
          </h2>
        </div>
        <br />
        <div style={{ marginLeft: '10px' }}>
          <input
            type="text"
            placeholder="Ingrese su comentario"
            value={this.state.respuesta}
            onChange={this.manejarRespuesta}
            style={{ width: '600%', height: '30px', margin: '0 auto' }}
          />
        </div>
      </div>
    </div>
    );
  }
}

export default Componente3;
