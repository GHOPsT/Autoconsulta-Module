import React from 'react';
import '../Login/Login.css';
import { Button, Checkbox, Form, Input} from 'antd';
import logo from '../../../images/imagenLogin.jpg';
import { FcSimCard } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginUser = async (values, navigate) => {
  try {
    console.log("Valores del formulario para iniciar sesión:", values);

    // Verificar la existencia del usuario en la base de datos
    const usuarioExistente = await verificarCredenciales(values.usuario, values.contrasenia);

    if (usuarioExistente) {
      // Si las credenciales son válidas, el usuario puede iniciar sesión
      console.log("Inicio de sesión exitoso para el usuario:", values.usuario);

      // Aquí puedes realizar acciones adicionales después del inicio de sesión, si es necesario
      navigate("/screenmain"); // Redirige a la página principal después del inicio de sesión

    } else {
      // Si las credenciales no son válidas, mostrar un mensaje de error o realizar acciones adicionales según sea necesario
      console.log("Credenciales incorrectas. No se puede iniciar sesión.");
      // Aquí puedes mostrar un mensaje de error o realizar otras acciones según tus necesidades
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};


const verificarCredenciales = async (usuario, contrasenia) => {
  try {
    // Realiza la verificación de credenciales en tu base de datos
    // Puedes usar axios para hacer una solicitud al backend y realizar la verificación en el servidor
    const url = "http://localhost:3002/login";
    const respuesta = await axios.post(url, { usuario, contrasenia });

    // La respuesta del servidor puede indicar si las credenciales son válidas
    const credencialesValidas = respuesta.data.success; // Asegúrate de ajustar esto según la estructura de tu respuesta

    if (credencialesValidas) {
      // Si las credenciales son válidas, obtén el DNI del usuario
      const urlDNI = `http://localhost:3002/getDNI/${usuario}`;
      const respuestaDNI = await axios.get(urlDNI);
      const dni = respuestaDNI.data.dni; // Asegúrate de ajustar esto según la estructura de tu respuesta

      // Devuelve tanto las credenciales válidas como el DNI del usuario
      return { credencialesValidas, dni };
    } else {
      // Si las credenciales no son válidas, devuelve solo las credenciales válidas
      return { credencialesValidas };
    }

  } catch (error) {
    console.error("Error al verificar las credenciales:", error);
    throw error; // Puedes decidir lanzar el error o manejarlo de otra manera según tus necesidades
  }
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
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
            onFinish={(values) => LoginUser(values, navigate)} // Cambiado el nombre de la función aquí
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
