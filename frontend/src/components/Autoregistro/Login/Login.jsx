import React from 'react'
import './login.css'

import {Button , Checkbox , Form , Input } from 'antd'

import logo from '../../../images/imagenLogin.jpg'

import { Link } from 'react-router-dom'

import {FcSimCard} from 'react-icons/fc'

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
                        initialValues={{
                            requiredMarkValue: 'optional',
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
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
                    <img src = {logo} alt='Logo'/>
                </div>

           
        </div>
    </div>
    

   )
}

export default Login
