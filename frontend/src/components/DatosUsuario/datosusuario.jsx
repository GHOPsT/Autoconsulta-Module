import React from 'react';
import { Avatar, List } from 'antd';
const data = [
  {
    title: 'Ant Design Title 1',
    description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
  },
  {
    title: 'Ant Design Title 2',
    description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
  },
  {
    title: 'Ant Design Title 3',
    description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
  },
  {
    title: 'Ant Design Title 4',
    description: "Ant Design, a design language for background applications, is refined by Ant UED Team"
  },
];

const DatosUsuario = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
        />
      </List.Item>
    )}
  />
);
export default App;