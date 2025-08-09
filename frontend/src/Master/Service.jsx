import { useState } from "react";
import { EditOutlined , DeleteOutlined  } from "@ant-design/icons";
import { useEffect } from "react";
import  Table  from "../components/Table.jsx";
import ModalComponent from "../components/Modal.jsx";
import { Button }from"antd";
import { FormN  } from "../components/FormR.jsx";
import "../css/table.css"
import { useAdmin } from "../context/adminProvider.jsx";
import {notyf} from '../lib/notyf.js';
import { Empty } from 'antd';
import Popover from "../components/Popover.jsx";



const TablaServicios = () => {
    // Definir los encabezados de la tabla
    const { selectedProject, services, getServices, createService, updateService} = useAdmin();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const openModalDelete = () => setIsModalDeleteOpen(true);
    const closeModalDelete = () => setIsModalDeleteOpen(false);
    const openModalEdit = () => setIsModalOpenEdit(true);
    const closeModal = () => setIsModalOpen(false);
    const closeModalEdit = () => setIsModalOpenEdit(false);
    const [selectedRow, setSelectedRow] = useState(null);
    if(!selectedProject) return <Empty/>
    useEffect(() => {
      getServices(selectedProject.id);
      console.log(selectedProject);
      
      },[]);
      const fields = [
        {
          name: 'name',
          label: 'Nombre del servicio',
          type: 'text',
        },
        {
          name: 'description',
          label: 'descripción',
          type: 'textarea',
          validation: {
            required: "La descriptción es obligatoria",
          },
        },
        {
          name: 'costo',
          label: 'costo',
          type: 'number',
        },
        {
          name: 'id_project',
          label: 'nombre del projecto',
          type: 'text',
          defaultValue: selectedProject ? selectedProject.id : '' 
        },
        {
          name: 'time',
          label: 'tiempo estimado',
          type: 'text',
          validation: {
            required: "el tiempo es requrido es obligatoria",
          },  
        },
        {
          name: 'img',
          label: 'tiempo estimado',
          type: 'file',
          validation: {
            required: "el tiempo es requrido es obligatoria",
          },  
        }
      ];

    const handleClick = (row) =>{
      setSelectedRow(row)
      openModalEdit();
      console.log(row);
    }
    const handleAddProject = () =>{
      if (selectedProject) {
        console.log(selectedProject,'dispara el selected project');
        return openModal();
      }
      return notyf.open({
        type: 'info',
        message: 'no se ha seleccionado un usuario',
      });
    }
    const handleClickDelete = (row) =>{
      openModalDelete();
      setSelectedRow(row);
    }
    const headers = ['name','description','time','costo','project','img', 'actions'];
   
    let rows; 
    // Definir las filas de la tabla
    if (services){
        console.log(services);
        
      rows =  services.map(e => [
        e.name,
        <Popover title={'Description'} text={e.description} />,
        e.time,
        e.costo,
        e.Project.name,
        <img style={{ maxWidth: '50px', height: 'auto' }} src={`http://localhost:4000/${e.img}`} alt="no se encutra" />,
        <div key={e.id}>
          <Button onClick={() => handleClick(e)}> 
            <EditOutlined />
          </Button>
          <Button onClick={() => handleClickDelete(e)}> 
            <DeleteOutlined  />
          </Button>
        </div>
      ])
    }
    if (rows) return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex  justify-between"> 
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tabla de Servicios</h1>
        <Button className="primary" onClick={handleAddProject}> agregar</Button>
        </div>
         <Table headers={headers} rows={rows} />
         <ModalComponent isOpen={isModalOpen} onClose={closeModal} >
            <FormN  block={'id_project'} functionS={createService} fields={fields} buttonText={'Crear'} title={'Crear services'} callback={closeModal}/>
         </ModalComponent> 
        <ModalComponent isOpen={isModalOpenEdit} onClose={closeModalEdit} >
            <FormN   row={selectedRow}
            fields={fields}
            block={'id_project'}
            functionS={updateService}
            buttonText="Guardar cambios"
            title="Editar Registro"
            callback={closeModalEdit}
            isEditMode={true}  />
         </ModalComponent>  
         <ModalComponent   isOpen={isModalDeleteOpen} onClose={closeModalDelete}>
            <div className="center">
              <div>
              <h3>Estas seguro de eliminar</h3>
              { selectedRow && <p>al Servicio {selectedRow.name}</p> }
              </div>

              <button onClick={()=>{deleteRepre(selectedRow.id); closeModalDelete()}} className="btn delete-button">Eliminar Projecto</button>
            </div>
          </ModalComponent>
      </div>
    )
    if(!rows) return <Empty />
  };
  const Services = () =>{

    return(
      <div className="center flex flex-col">
        <TablaServicios />
      </div>
    )
  }
  export default Services;