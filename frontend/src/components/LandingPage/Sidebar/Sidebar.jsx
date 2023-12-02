import { Menu }  from 'antd'
import { HomeOutlined , AppstoreOutlined, BarsOutlined, FormOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Sidebar = ({darkTheme}) => {
    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>

      <Menu.Item key='inicio' icon={<HomeOutlined/>}> <Link to='/screenmain'>Inicio</Link></Menu.Item>
      <Menu.Item key='miplan' icon={<AppstoreOutlined/>}><Link to='/detallesuser'>Mi plan</Link></Menu.Item>
      <Menu.Item key='historial' icon={<BarsOutlined/>}><Link to='/solicitudes'>Solicitudes</Link></Menu.Item>
      <Menu.Item key='pedidos' icon={<AppstoreOutlined/>}><Link to='/pedidos'>Pedidos</Link></Menu.Item>
      <Menu.Item key='encuesta' icon={<BarsOutlined/>}> <Link to='/encuesta'>Encuesta</Link></Menu.Item>
    </Menu>
    )
}

export default Sidebar