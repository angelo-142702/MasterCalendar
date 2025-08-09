import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InsertRowAboveOutlined ,
  SnippetsOutlined,
  SettingOutlined, 
  CalendarOutlined,
  PartitionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import CalendarComponent from '../Calendar.jsx';
import Calendar from '../Master/Calendar.jsx';
import Tabla from "../components/Personal.jsx";
import Reservation from '../Master/formReservation.jsx';
import Projects from '../Master/Projects.jsx';
import Services from '../Master/Service.jsx';
import Schedule from '../Master/schedules.jsx';
import '../css/master.css'
import User from '../Master/Users.jsx';
import Representantes from '../Master/Representantes.jsx';
import Suscriptions from '../Master/suscriptions.jsx';
import Citas from "../Master/citas.jsx"
//import Appointments from '../Master/Appointments.jsx';
const { Header, Sider, Content } = Layout;
const MasterStruct = () => {
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
      <Sider className='slider' trigger={null} collapsible collapsed={collapsed}>
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
              icon: <UserOutlined />,
              label: 'personal',
            },
            {
              key: '2',
              icon: <PartitionOutlined />,
              label: 'Projects',
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: 'administracion',
              children: [
                {
                  key: '5',
                  label: 'reservaciones',
                },
                {
                  key: '6',
                  label: 'Servicios',
                },
                {
                  key: '7',
                  label: 'empleados',
                },
                {
                  key: '8',
                  label: 'Horarios',
                },
                {
                  key: '10',
                  label: 'citas',
                },
              ],
            },
            {
              key: '4',
              icon: <CalendarOutlined/>,
              label: 'cobros',
            },
            {
              key: '9',
              icon: <SnippetsOutlined />,
              label: 'suscripciones',
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
         {selectedKey == "2"  &&
        <div>
            <h1>Soy el masterStruct</h1>
            <Projects/>

        </div>
            }
            { selectedKey == "1" && < User /> }
            { selectedKey == '4' && <Calendar></Calendar> }
            { selectedKey == "5" && <  Reservation/> }
            { selectedKey == '9' &&  < Suscriptions />  }
            { selectedKey == '6' &&  < Services />  }
            { selectedKey == '7' &&  < Representantes />  }
            { selectedKey == '8' &&  < Schedule />  }
            { selectedKey == '10' &&  < Citas />  }
        </Content>
      </Layout>
    </Layout>
  );
};
export default MasterStruct;