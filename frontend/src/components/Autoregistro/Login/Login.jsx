import React from 'react'
import './login.css'

import {Button , Checkbox , Form , Input } from 'antd'

import logo from '../../../images/LogoSim.png'
import logo2 from '../../../images/logo.svg'

// Informacion para la consola al ingresar los datos
const onFinish = (values) => {
    console.log('Success: ', values)
}
const onFinishFailed = (errorInfo) => {
    console.log('Failed: ' , errorInfo)
}




const Login = () => {

    const [form] = Form.useForm()
  return (

    <div className='loginPage flex login-container'>
        <div className='container flex '>
            <div className='imagenDiv'>
                <img src = {logo} alt='Logo'/>

                <div className="textDiv">
                    <h2 className="tittle">Hola</h2>
                    <p>Estoy debajo del hola</p>
                </div>

                <div className="footerDiv flex">
                    <span className='text'>¿No posees una cuenta?</span>
                    <Button type="link">Crear Cuenta</Button>
                </div>
            </div>

            <div className="formDiv flex">
                <div className="headerDiv">
                    <img src={logo2} alt='Logo2' />
                    <h3>BIENVENIDO</h3>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        requiredMarkValue: 'optional',
                    }}
                >
                    <Form.Item label="Usuario" name="usuario" rules={[{ required: true, message: 'Por favor, ingrese su usuario' }]}>
                        <Input placeholder="Ingrese Usuario" />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="contrasena"
                        rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]
                        }
                    >
                        <Input.Password placeholder="Ingrese Contraseña" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Ingresar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
    

   )
}

export default Login
