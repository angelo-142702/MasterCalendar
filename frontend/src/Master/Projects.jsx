import { useState } from "react";
import { EditOutlined , DeleteOutlined  } from "@ant-design/icons";
import { useEffect } from "react";
import  Table  from "../components/Table.jsx";
import ModalComponent from "../components/Modal.jsx";
import { Button }from"antd";
import { FormN as Form, ProjectForm ,ProjectEditForm} from "../components/FormR.jsx";
import "../css/table.css"
import { useAdmin } from "../context/adminProvider.jsx";
import Popover from "../components/Popover.jsx";
import {notyf} from '../lib/notyf.js';

const TableProjects = () => {
    // Definir los encabezados de la tabla
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const { Projects , selectedUser, getProjects, crearProject, updateProject, deleteProject} = useAdmin();
    const openModal = () => setIsModalOpen(true);
    const openModalDelete = () => setIsModalDeleteOpen(true);
    const closeModalDelete = () => setIsModalDeleteOpen(false);
    const openModalEdit = () => setIsModalOpenEdit(true);
    const closeModal = () => setIsModalOpen(false);
    const closeModalEdit = () => setIsModalOpenEdit(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleClick = (row) =>{
      setSelectedRow(row)
      openModalEdit();
      console.log(row);
    }
    const handleAddProject = () =>{
      if (selectedUser) {
        console.log(selectedUser,'dispara el selected user');
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
    const headers = ['name','address','description','phone','user','categoria','logo', 'actions'	];
     useEffect(() => {
    getProjects();
    },[]);
    let rows; 
    // Definir las filas de la tabla
    if (Projects){
      rows =  Projects.map(e => [
        e.name,
        <Popover title={'Address'} text={e.address} />,
        <Popover title={'Description'} text={e.description} />,
        e.phone,
        e.id_user,
        e.id_category,
         <img style={{ maxWidth: '50px', height: 'auto' }} src={`http://localhost:4000/${e.logo}`} alt="no se encutra" />,
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
    
    
   /*  if (Projects ) {
      
    } */
    if (rows) return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex  justify-between"> 
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tabla de Projectos</h1>
        <Button className="primary" onClick={handleAddProject}> agregar</Button>
        </div>
         <Table headers={headers} rows={rows} />
         <ModalComponent isOpen={isModalOpen} onClose={closeModal} >
            <ProjectForm  finaly={getProjects} title={'Crear Project'}  onSubmit={crearProject} callback={closeModal}/>
         </ModalComponent> 
        <ModalComponent isOpen={isModalOpenEdit} onClose={closeModalEdit} >
            <ProjectEditForm row={selectedRow} title={'Editar Projecto'}  update={updateProject} callback={closeModalEdit}/>
         </ModalComponent>  
         <ModalComponent   isOpen={isModalDeleteOpen} onClose={closeModalDelete}>
            <div className="center">
              <div>
              <h3>Estas seguro de eliminar</h3>
              { selectedRow && <p>al prjecto de {selectedRow.name}</p> }
              </div>

              <button onClick={()=>{deleteProject(selectedRow.id); closeModalDelete()}} className="btn delete-button">Eliminar Projecto</button>
            </div>
          </ModalComponent>
      </div>
    );
  };
  const Projects = () =>{

    return(
      <div className="center flex flex-col">
        <TableProjects />
      </div>
    )
  }
  export default Projects;