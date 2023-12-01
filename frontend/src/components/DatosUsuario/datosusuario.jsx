import React from 'react';
import { Avatar, List } from 'antd';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DatosUsuario = () => {
  const data = [
    {
      title: 'Ant Design Title 1',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team',
    },
    {
      title: 'Ant Design Title 2',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team',
    },
    {
      title: 'Ant Design Title 3',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team',
    },
    {
      title: 'Ant Design Title 4',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team',
    },
  ];

  return (
    <div className="detallesuser">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/screenmain">
            <HomeOutlined /> Inicio
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Mi Plan</Breadcrumb.Item>
      </Breadcrumb>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default DatosUsuario;
