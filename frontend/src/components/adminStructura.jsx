import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InsertRowAboveOutlined ,
  SettingOutlined, 
  CalendarOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import CalendarComponent from '../Calendar.jsx';
import Tabla from "../components/Personal.jsx";
const { Header, Sider, Content } = Layout;
const Struct = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState('1');
  // Función para manejar el clic en el menú
  const handleMenuClick = (event) => {
    setSelectedKey(event.key);
    console.log(event.key);
     // Actualiza el estado con la clave del elemento seleccionado
  };
  return (
    <Layout className='h-full'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              color:'white',
              width: 64,
              height: 64,
            }}
          />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick} // Maneja el clic en el menú

          items={[
            {
              key: '1',
              icon: <CalendarOutlined />,
              label: 'Calendario',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'personal',
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: 'administracion',
              children: [
                {
                  key: '5',
                  label: 'Option 5',
                },
                {
                  key: '6',
                  label: 'Option 6',
                },
                {
                  key: '7',
                  label: 'Option 7',
                },
                {
                  key: '8',
                  label: 'Option 8',
                },
              ],
            },
            {
              key: '4',
              icon: <InsertRowAboveOutlined />,
              label: 'tabla',
            },
          ]}
        />
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
         
        </Header> */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        > 
         {selectedKey == "1"  &&
        <div className='size-calendar'>
            <CalendarComponent />
        </div>
            }
            { selectedKey == "2" && <Tabla/> }
        </Content>
      </Layout>
    </Layout>
  );
};
export default Struct;