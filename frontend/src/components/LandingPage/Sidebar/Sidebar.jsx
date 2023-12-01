import { Menu }  from 'antd'
import { HomeOutlined , AppstoreOutlined, BarsOutlined, FormOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Sidebar = ({darkTheme}) => {
    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>

      <Menu.Item key='inicio' icon={<HomeOutlined/>}> <Link to='/dashboard'>Inicio</Link></Menu.Item>
      <Menu.Item key='miplan' icon={<AppstoreOutlined/>}><Link to='/detallesuser'>Mi plan</Link></Menu.Item>
      <Menu.SubMenu key='historial' icon={<BarsOutlined/>} 
        title='Historial'> 
            <Menu.Item key='task-1'><Link to='/solicitudes'>Solicitudes</Link></Menu.Item>
            <Menu.Item key='task-2'> Reclamos</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key='reclamos' icon={<AppstoreOutlined/>}><Link to='/reclamos'>Reclamos</Link></Menu.Item>
      <Menu.Item key='encuesta' icon={<FormOutlined/>}> <Link to='/encuesta'>Encuesta</Link></Menu.Item>
    </Menu>
    )
}

export default Sidebar