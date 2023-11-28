import React, { Component } from 'react';
import frecuencia from '../../images/Frecuencia.png';

class Componente2 extends Component {
  constructor() {
    super();
    this.state = {
      opcionSeleccionada: null,
    };
  }

  handleCheckboxChange = (event) => {
    const { name } = event.target;
    this.setState({ opcionSeleccionada: name })
    this.props.onChange(name);
  }

  render() {
    const alternativas = [
      { name: 'opc1', label: 'Nunca' },
      { name: 'opc2', label: 'Ocasionalmente' },
      { name: 'opc3', label: 'Mensualmente' },
      { name: 'opc4', label: 'Semanalmente' },
      { name: 'opc5', label: 'A diario' },
    ];

    const labelStyle = {
        marginRight: '80px', 
        color: '#0d1c78',
      };

    const imageStyle = {
        width: '950px',
        height: '70px',
      };   

    const containerStyle = {
      display: 'flex', 
      justifyContent: 'flex-start', 
    };
    
    return (
      <div className='custom-container'>
        <div className="pregunta" style={{ ...containerStyle, marginLeft: '10px' }}>
          <h2 className="text" style={{ color: '#0d1c78'}}>2. ¿Con qué frecuencia utiliza nuestro servicio móvil?</h2>
        </div>
        <br />
        <div className="alternativa2" style={{ ...containerStyle, marginLeft: '100px' }}>
          {alternativas.map((opcion, index) => (
            <div key={opcion.name} style={{ display: 'inline-block', marginRight: '10px' }}>
            <label style={{ ...labelStyle, color: this.state.opcionSeleccionada === opcion.name ? '#0d1c78' : 'blue' }}>
              <input
                type="radio"
                name={opcion.name}
                checked={this.state.opcionSeleccionada === opcion.name}
                onChange={this.handleCheckboxChange}
              />
              {opcion.label}
            </label>
          </div>
          ))}
        </div>
        <div className="imagenes" style={{...containerStyle,  marginLeft: '30px' }}>
          <img src={frecuencia} alt="Frecuencia" style={imageStyle} />  
        </div>
      </div>
    );
  }
}

export default Componente2;
