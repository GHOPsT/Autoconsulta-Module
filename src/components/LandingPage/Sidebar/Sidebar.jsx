import { Menu } from 'antd'
import { HomeOutlined , 
         AppstoreOutlined, 
         BarsOutlined,} from '@ant-design/icons'

import { Link } from 'react-router-dom'



const Sidebar = ({darkTheme}) => {
    return (
        <Menu theme ={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>
            
            <Menu.Item key='inicio' icon={<HomeOutlined/>}> 
                <Link to= '/inicio'>
                    Inicio
                </Link>
            </Menu.Item>
            
            <Menu.Item key='miplan' icon={<AppstoreOutlined/>}> 
                <Link to= '/miplan'>
                    Mi Plan
                </Link>
            </Menu.Item>

            <Menu.SubMenu key='historial' icon={<BarsOutlined/>} 
                title='Historial'> 
                <Menu.Item key='solicitudes'>
                    <Link to='/solicitudes'>
                        Solicitudes
                    </Link>
                </Menu.Item>

                <Menu.Item key='reclamos'>
                    <Link to='/reclamos'>
                        Reclamos
                    </Link>
                </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key='cuentanos' icon={<AppstoreOutlined/>}> 
                <Link to= '/cuentanos'>
                    Cuentanos
                </Link>
            </Menu.Item>

        
        </Menu>
    )
}

export default Sidebar