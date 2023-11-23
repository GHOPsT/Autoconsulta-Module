import React from 'react'
import {Button , Checkbox , Form , Input } from 'antd'
import logo from '../../../images/imagenRegister.jpg'
import { Link } from 'react-router-dom'
import {FcSimCard} from 'react-icons/fc'
import axios from 'axios'
import "./Register.css"


// Informacion para la consola al ingresar los datos
const onFinish = (values) => {
    console.log('Success: ', values)
}
const onFinishFailed = (errorInfo) => {
    console.log('Failed: ' , errorInfo)
}

const validarDNI = async (dni) => {
    try {
        const url = `https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${dni}`;
        const respuesta = await axios.get(url);

        return respuesta.status === 200;
    } catch (e) {
        console.error('Error al verificar el DNI:', e);
        return false;
    }
};


const RegisterUser = async (values) => {
    try {
        // Verificar la existencia del DNI antes de registrar al usuario
        const dniExistente = await validarDNI(values.DNI);

        if (dniExistente) {
            // Si el DNI existe, continuar con el registro del usuario
            const usuarioNuevo = { validar: values.validar, usuario: values.usuario, contrasenia: values.contrasena };
            const url = "http://localhost:3002/registro";
            const respuesta = await axios.post(url, usuarioNuevo);
            console.log('Usuario registrado con éxito:', respuesta);
        } else {
            // Si el DNI no existe, mostrar un mensaje de error o realizar acciones adicionales según sea necesario
            console.log('El DNI no existe. No se puede registrar al usuario.');
            // Aquí puedes mostrar un mensaje de error o realizar otras acciones según tus necesidades
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
};
  

const Register = () => {

    const [form] = Form.useForm()
  return (
        <div className='loginPage flex login-container'>
            <div className='container'>
                <div className="formDiv flex" style={{ marginTop: '-20px' }}>
                    <div className="headerDiv">
                        <FcSimCard />
                        <h3>Crear cuenta</h3>
                        <span className='text'>¿Ya posee una cuenta?</span>
                        <Button type="link">
                            <Link to="/">Ingresar</Link>
                        </Button>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            requiredMarkValue: 'optional',
                        }}
                        onFinish={RegisterUser}
                        onFinishFailed={onFinishFailed}>
                        <Form.Item label="DNI" name="DNI" rules={[{required: true, message: 'Por favor, ingrese su DNI' }]}style={{marginTop: '-10px'}}>
                            <Input placeholder='Ingrese DNI' />
                        </Form.Item>
                        <Form.Item label="Usuario" name="usuario" rules={[{ required: true, message: 'Por favor, ingrese su usuario' }]}>
                            <Input placeholder="Ingrese Usuario" />
                        </Form.Item>
                        <Form.Item label="Contraseña" name="contrasena" rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]}>
                            <Input.Password placeholder="Ingrese Contraseña" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block onClick={RegisterUser}>
                            Registrarse
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='imagenDiv'>
                    <img src = {logo} alt='Logo'/>
                </div>
        </div>
    </div>
   )
}

export default Register
