import React from 'react'
import {Button , Form , Input } from 'antd'
import logo from '../../../images/imagenRegister.jpg'
import { Link } from 'react-router-dom'
import {FcSimCard} from 'react-icons/fc'
import axios from 'axios'
import "./Register.css"

const onFinishFailed = (errorInfo) => {
    console.log('Failed: ' , errorInfo)
}

const validarDNI = async (dni) => {
    try {
        const url = `https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${dni}`;
        const respuesta = await axios.get(url);

        if (respuesta.status === 200) {
            return true;
        } else {
            throw new Error('DNI no encontrado');
        }
        
    } catch (e) {
        console.error('Error al verificar el DNI:', e);
        return false;
    }
};

const RegisterUser = async (values) => {
    try {
        console.log("valores del formulario", values);
        
        // Verificar la existencia del DNI antes de registrar al usuario
        const dniExistente = await validarDNI(values.dni);

        if (dniExistente) {

            // Obtenemos los datos del enlace proporcionado
            const url = `https://modulo-ventas.onrender.com/getlineas/${values.dni}`;
            const response = await axios.get(url);
            let dataplan = response.data;

            const urlPlan = "http://localhost:3002/registrar-datosplan";
            const RespuestaRegistroPlan =await axios.post(urlPlan, dataplan);
            console.log('Usuario registrado con exito: ', RespuestaRegistroPlan);

            // Obtener los datos del usuario basándote en el DNI
            const urlDatosUsuario = `https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${values.dni}`;
            const respuestaDatosUsuario = await axios.get(urlDatosUsuario);
            let datosUsuario = respuestaDatosUsuario.data;

            // Obtener el número de teléfono del servicio externo
            const urlTelefono = `https://clientemodulocrm.onrender.com/detallesCliente/buscarDetallesDNI/${values.dni}`;
            const respuestaTelefono = await axios.get(urlTelefono);
            let telefono = respuestaTelefono.data.contac_externo; 

            // Agregar el número de teléfono a los datos del usuario
            datosUsuario.telefono = telefono;

            // Formatear la fecha a YYYY-MM-DD
            if (datosUsuario.fechanac) {
                const fecha = new Date(datosUsuario.fechanac);
                const year = fecha.getFullYear();
                const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11, por lo que añadimos 1
                const day = String(fecha.getDate()).padStart(2, '0');
                datosUsuario.fechanac = `${year}-${month}-${day}`;
            }

            // Combinar los valores del formulario con los datos del usuario
            const datosCompletos = { ...values, ...datosUsuario };

            // Enviar todos los datos al backend
            const urlRegistro = "http://localhost:3002/registro";
            const respuestaRegistro = await axios.post(urlRegistro, datosCompletos);
            console.log('Usuario registrado con éxito:', respuestaRegistro);

            // Aquí puedes manejar la respuesta del backend según tus necesidades

        } else {
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
                        <Form.Item label="DNI" name="dni" rules={[{required: true, message: 'Por favor, ingrese su DNI' }]}style={{marginTop: '-10px'}}>
                            <Input placeholder='Ingrese DNI' />
                        </Form.Item>
                        <Form.Item label="Usuario" name="usuario" rules={[{ required: true, message: 'Por favor, ingrese su usuario' }]}>
                            <Input placeholder="Ingrese Usuario" />
                        </Form.Item>
                        <Form.Item label="Contraseña" name="contrasenia" rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]}>
                            <Input.Password placeholder="Ingrese Contraseña" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block >
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
