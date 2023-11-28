import React, { Component } from 'react';
import medidor from '../../images/Medidor.png';
class Componente4 extends Component {
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
      { name: 'op1', label: 'Muy lento e ineficiente' },
      { name: 'op2', label: 'Lento' },
      { name: 'op3', label: 'Promedio' },
      { name: 'op4', label: 'Rápido' },
      { name: 'op5', label: 'Muy rápido y eficiente' },
    ];

    const labelStyle = {
      marginRight: '80px',
      color: '#0d1c78',
    };

    const imageStyle = {
      width: '700px',
      height: 'auto',
    };

    const containerStyle = {
      display: 'flex', 
      alignItems: 'flex-start', 
    };

    return (
        <div className='custom-container'>
        <div className="pregunta" style={{...containerStyle, marginLeft: '10px' }}>
          <h2 className="text" style={{ color: '#0d1c78', textAlign: 'left' }}>4. ¿Cómo calificaría la velocidad y la eficiencia de nuestro servicio móvil?</h2>
        </div>
        <br />
        <div className="alternativa4" style={{ ...containerStyle, marginLeft: '100px' }}>
          {alternativas.map((opcion, index) => (
            <div key={opcion.name} style={{ display: 'inline-block', alignItems: 'center' }}>
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
        <br />
        <div className="imagenes" style={{...containerStyle, marginLeft: '150px' }}>
        <img src={medidor} alt="Medidor" style={imageStyle} />  
        </div>
      </div>
    );
  }
}

export default Componente4;
