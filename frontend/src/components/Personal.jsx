import  Table  from "../components/Table.jsx";
import ModalComponent from "./Modal.jsx";
import { useState } from "react";
import { EditOutlined , DeleteOutlined  } from "@ant-design/icons";
import { Button }from"antd";
import { FormN as Form} from "./FormR.jsx"
import "../css/table.css"
const FormRepresentante = () => {
  const handleSubmit = (data) => {
    console.log('Datos del formulario:', data);
    alert(JSON.stringify(data, null, 2));
  };

  const fields = [
    {
      name: 'id_proyecto',
      type: 'hidden',
      label: '',
      placeholder: 'taller refrigeracion',
      defaultValue: '1', // Valor predeterminado
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      placeholder: 'name',
      defaultValue: '', // Valor predeterminado
    },
    {
      name: 'email',
      type: 'email',
      label: 'email',
      placeholder: '@',
      defaultValue: '', // Valor predeterminado
    },
    {
      name: 'phone',
      type: 'text',
      label: 'telefono',
      placeholder: '04...',
      defaultValue: '', // Valor predeterminado
    },
    
    
  ];
  return (
    <div>
      <h1>Editar Representantes</h1>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Enviar Formulario" />
    </div>
  );
};
const FormService = () => {
  const handleSubmit = (data) => {
    console.log('Datos del formulario:', data);
    alert(JSON.stringify(data, null, 2));
  };

  const fields = [
    {
      name: 'servicio',
      type: 'text',
      label: 'Nombre del Servicio',
      placeholder: 'Mantenimineto',
      defaultValue: 'Mantenimineto', // Valor predeterminado
    },
    {
      name: 'country',
      type: 'select',
      label: 'minutos',
      defaultValue: '30min', // Valor predeterminado
      options: [
        { value: '30min', label: '30min' },
        { value: '90min', label: '90min' },
        { value: '180min', label: '180min' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'descripción del Servicio',
      placeholder: 'muestra',
      defaultValue: 'muestra', // Valor predeterminado
    },
    {
      name: 'precio',
      type: 'number',
      label: 'precio del Servicio',
      placeholder: '20$',
      defaultValue: '20$', // Valor predeterminado
    },
  ];


  return (
    <div>
      <h1>Editar servicios</h1>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Enviar Formulario" />
    </div>
  );
};

function alert (){ console.log("hola payaso");}

const TablaRepresentante = () => {
  // Definir los encabezados de la tabla
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const headers = ['id_project','name','email','phone','foto','acciones'	];
  
  // Definir las filas de la tabla
  const rows = [
    [
     '1',            
      'axel Martinez',
      'axel12@gmail.com',
      '04123612679',
      '../img/galeria/mnjkñmñlksad.png',
      <div>

       <Button onClick={openModal}>
        <EditOutlined></EditOutlined>
       </Button>  
        
      </div>
      
    ],
    
  ];

  return (

    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex  justify-between"> 
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tabla de Representantes</h1>
      <Button className="primary" onClick={()=> openModal()}> agregar</Button>
      </div>
      <Table headers={headers} rows={rows} />
       <ModalComponent isOpen={isModalOpen} onClose={closeModal} >
          <FormRepresentante />
       </ModalComponent>
      
    </div>
  );
};
const TablaServicios = () => {
  // Definir los encabezados de la tabla
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const headers = ['Servicio', 'minutos', 'Descripcion','Precio', 'acciones'];
  
  // Definir las filas de la tabla
  const rows = [
    [
     'Mantenimineto',            
      '150 min',
      'limpieaza profunda',
      '20$',
      <div>
       <Button onClick={openModal}>
        <EditOutlined></EditOutlined>
       </Button>  
      </div>
      
    ],
    [
      'Reparacion',
      '180min',
      'evaluacion y correccion',
      '25$',
      <div>
      <Button onClick={openModal}>
        <EditOutlined></EditOutlined>
       </Button>
      </div>
    ]
  ];

  return (

    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex  justify-between"> 
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tabla de Servicios</h1>
      <Button className="primary" onClick={()=> openModal()}> agregar</Button>
      </div>
      <Table headers={headers} rows={rows} />
       <ModalComponent isOpen={isModalOpen} onClose={closeModal} >
          <FormService />
       </ModalComponent>
    </div>
  );
};


const Personal = () =>{

  return(
    <div className="center flex flex-col">
      <TablaServicios />
      <TablaRepresentante />
    </div>
  )
}
export default Personal;