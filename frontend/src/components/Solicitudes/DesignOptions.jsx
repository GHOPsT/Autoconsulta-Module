import React from 'react';
import { Form, Radio, Switch } from 'antd';

const DesignOptions = ({ bordered, size, yScroll, xScroll, onBorderChange, onSizeChange, onXScrollChange }) => {
  return (
    <Form
      layout="inline"
      className="components-table-demo-control-bar"
      style={{
        marginBottom: 16,
      }}
    >
      <Form.Item label="Bordeado">
        <Switch checked={bordered} onChange={onBorderChange} />
      </Form.Item>

      <Form.Item label="Tamaño">
        <Radio.Group value={size} onChange={onSizeChange}>
          <Radio.Button value="large">Largo</Radio.Button>
          <Radio.Button value="middle">Mediano</Radio.Button>
          <Radio.Button value="small">Pequeño</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Scroll">
        <Radio.Group value={xScroll} onChange={onXScrollChange}>
          <Radio.Button value={undefined}>Desactivado</Radio.Button>
          <Radio.Button value="scroll">Activado</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default DesignOptions;
