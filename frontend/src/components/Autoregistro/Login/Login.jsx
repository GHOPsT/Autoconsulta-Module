import React, { useState } from 'react';
import '../Login/Login.css';
import { Button, Checkbox, Form, Input, message } from 'antd';
import logo from '../../../images/imagenLogin.jpg';
import { FcSimCard } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom'; // Importa useHistory
import axios from 'axios';

const Login = () => {
  const [form] = Form.useForm();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (values) => {
    try {
      const response = await axios.post('http://localhost:3002/login', {
        usuario: values.usuario,
        contrasenia: values.contrasenia,
      });

      if (response.data.success) {
        setLoginSuccess(true);
        // Realiza una redirección al dashboard
        navigate('/screenmain');
      } else {
        setLoginSuccess(false);
        message.error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la autenticacion: ', error);
      message.error('Error en la autenticacion: ' + error.message);
    }
  };

  return (
    <div className='loginPage flex login-container'>
      <div className='container'>
        <div className="formDiv flex">
          <div className="headerDiv">
            <FcSimCard />
            <h3>Iniciar sesión</h3>
            <span className='text'>¿No posees una cuenta?</span>
            <Button type="link"><Link to="/register">Registrarse</Link></Button>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={loginHandler} // Cambiado el nombre de la función aquí
          >
            <Form.Item label="Usuario" name="usuario" rules={[{ required: true, message: 'Por favor, ingrese su usuario' }]}>
              <Input placeholder="Ingrese Usuario" />
            </Form.Item>

            <Form.Item label="Contraseña" name="contrasenia" rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]}>
              <Input.Password placeholder="Ingrese Contraseña" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Recuerdame</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className='imagenDiv'>
          <img src={logo} alt='Logo' />
        </div>
      </div>
    </div>
  );
};

export default Login;
