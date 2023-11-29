import React, { Component } from 'react';
import estados1 from '../../images/Estados1.png';
import estados2 from '../../images/Estados2.png';
import estados3 from '../../images/Estados3.png';
import estados4 from '../../images/Estados4.png';
import estados5 from '../../images/Estados5.png';


class Componente1 extends Component {
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
      { name: 'opcion1', label: 'Muy insatisfecho' },
      { name: 'opcion2', label: 'Insatisfecho' },
      { name: 'opcion3', label: 'Regular' },
      { name: 'opcion4', label: 'Satisfecho' },
      { name: 'opcion5', label: 'Muy satisfecho' },
    ];

    const imageStyle = {
      width: '70px',
      height: 'auto',
    };

    const labelStyle = {
      marginRight: '80px',
      color: '#0d1c78',
    };

    const containerStyle = {
      display: 'flex', // Aplica flex a este contenedor
      justifyContent: 'flex-start', // Alinea los elementos a la izquierda
    };

    const imageMargin1 = 115;
    const imageMargin2 = 95;
    const imageMargin3 = 90;
    const imageMargin4 = 115;

    return (
      <div className='custom-container'>
        <div className="pregunta" style={{ ...containerStyle, marginLeft: '10px' }}>
          <h2 className="text" style={{ color: '#0d1c78'}}>
            1. En una escala del 1 al 5, ¿Qué tan satisfecho está con nuestro servicio móvil?
          </h2>
        </div>
        <br />
        <div className="alternativa1" style={{ ...containerStyle, marginLeft: '100px' }}>
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
        <div className="imagenes" style={{ ...containerStyle, marginLeft: '135px' }}>
          <img src={estados1} alt="Imagen 1" style={{ ...imageStyle, marginRight: imageMargin1 }} />
          <img src={estados2} alt="Imagen 2" style={{ ...imageStyle, marginRight: imageMargin2 }} />
          <img src={estados3} alt="Imagen 3" style={{ ...imageStyle, marginRight: imageMargin3 }} />
          <img src={estados4} alt="Imagen 4" style={{ ...imageStyle, marginRight: imageMargin4 }} />
          <img src={estados5} alt="Imagen 5" style={imageStyle} />
        </div>
      </div>
    );
  }
}

export default Componente1;
