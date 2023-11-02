import logo from '../../../images/LogoSim.png'
import './Login.css'
import React , {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
    return (
        <div className='loginPage flex'>
        <div className='container flex'>
            <div className='logoLogin'>
                <img src={logo} class="image"/>
                <div className="texLogin">
                    <h2 className='title'> Te gustaria conocer todos los servicios que tenemos disponibles para ti</h2>
                    <p>¡Registrate y mantente conectado!</p>
                </div>

                <div className='footerLogin flex'>
                    <span className='text'>¿No tienes una cuenta?</span>
                    <link to={'/register'}>
                    <button className='btn'>Registrate</button>
                    </link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login