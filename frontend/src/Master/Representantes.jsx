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


const TableRepresentante = () => {
    // Definir los encabezados de la tabla
    const { getRepres, repres, selectedProject, crearRepre,updateRepre, deleteRepre} = useAdmin();

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
      getRepres(selectedProject.id);
      console.log(selectedProject);
      
      },[]);
      const fields = [
        {
          name: 'name',
          label: 'Nombre del Representante',
          type: 'text',
        },
        {
          name: 'email',
          label: 'Correo electrónico',
          type: 'email',
          validation: {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico no válido",
            },
          },
        },
        {
          name: 'phone',
          label: 'Teléfono',
          type: 'text',
          validation: {
            required: "La el telefono es obligatoria",
          },
        },
        {
          name: 'id_project',
          label: '',
          type: 'text',
          defaultValue: selectedProject ? selectedProject.id : '' 
        },
        
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
    const headers = ['name','email','phone','project', 'actions'];
   
    let rows; 
    // Definir las filas de la tabla
    if (repres){
      rows =  repres.map(e => [
        e.name,
        e.email,
        e.phone,
        e.Project.name,
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tabla de Representante</h1>
        <Button className="primary" onClick={handleAddProject}> agregar</Button>
        </div>
         <Table headers={headers} rows={rows} />
         <ModalComponent isOpen={isModalOpen} onClose={closeModal} >
            <FormN  block={'id_project'} functionS={crearRepre} fields={fields} buttonText={'Crear'} title={'Crear Representante'} callback={closeModal}/>
         </ModalComponent> 
        <ModalComponent isOpen={isModalOpenEdit} onClose={closeModalEdit} >
            <FormN   row={selectedRow}
            fields={fields}
            block={'id_project'}
            functionS={updateRepre}
            buttonText="Guardar cambios"
            title="Editar Registro"
            callback={closeModalEdit}
            isEditMode={true}  />
         </ModalComponent>  
         <ModalComponent   isOpen={isModalDeleteOpen} onClose={closeModalDelete}>
            <div className="center">
              <div>
              <h3>Estas seguro de eliminar</h3>
              { selectedRow && <p>al representante {selectedRow.name}</p> }
              </div>

              <button onClick={()=>{deleteRepre(selectedRow.id); closeModalDelete()}} className="btn delete-button">Eliminar Projecto</button>
            </div>
          </ModalComponent>
      </div>
    )
    if(!rows) return <Empty />
  };
  const Repres = () =>{

    return(
      <div className="center flex flex-col">
        <TableRepresentante />
      </div>
    )
  }
  export default Repres;