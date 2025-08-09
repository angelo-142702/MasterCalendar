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
import { formataHora } from '../lib/formatDate.js'
import {CrearReservation} from '../components/Aform.jsx'

const TableCitas = () => {
    // Definir los encabezados de la tabla
    const { getCitas, Citas, selectedProject, crearCita,updateCita, deleteCita} = useAdmin();

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
      getCitas(selectedProject.id);
      console.log(selectedProject);
      
      },[]);
      const fields = [
        {
          name: 'id_Reservation',
          type: 'number',
          label: 'ID de Reservación',
          validation: {
            required: 'El ID de reservación es obligatorio'  // Requerido -> required
          },
        },
        {
          name: 'date',
          type: 'date',
          label: 'Fecha',
          validation: {
            required: 'La fecha es obligatoria'
          },
          defaultValue: ''
        },
        {
          name: 'startTime',  // Nombre corregido
          type: 'time',
          label: 'Hora de inicio',
          validation: {
            required: 'La hora de inicio es obligatoria'
          },
          defaultValue: ''
        },
        {
          name: 'endTime',
          type: 'time',
          label: 'Hora de fin',
          validation: {
            required: 'La hora de fin es obligatoria'
          },
          defaultValue: ''
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
    const headers = ['Servicio', 'fecha', 'inicio', 'final', 'actions'];
   
    let rows; 
    // Definir las filas de la tabla
    if (Citas){
      rows =  Citas.map(e => [
        e.Reservation.service,
        e.date,
        formataHora( e.startTime ),
        formataHora(e.endTime),
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
    if (rows ) return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex  justify-between"> 
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tabla de Horarios</h1>
        <Button className="primary" onClick={handleAddProject}> agregar</Button>
        </div>
         <Table headers={headers} rows={rows} />
         <ModalComponent isOpen={isModalOpen} onClose={closeModal} >
          <div><p>heellllos</p></div>
             <FormN  block={'id_project'} functionS={crearCita} fields={fields} buttonText={'Crear'} title={'Crear Citasentante'} callback={closeModal}/>
         </ModalComponent> 
        <ModalComponent isOpen={isModalOpenEdit} onClose={closeModalEdit} >
            <FormN   row={selectedRow}
            fields={fields}
            block={'id_project'}
            functionS={updateCita}
            buttonText="Guardar cambios"
            title="Editar Horario"
            callback={closeModalEdit}
            isEditMode={true}  />
         </ModalComponent>  
         <ModalComponent   isOpen={isModalDeleteOpen} onClose={closeModalDelete}>
            <div className="center">
              <div>
              <h3>Estas seguro de eliminar</h3>
              { selectedRow && <p>al Horario del día {selectedRow.name}</p> }
              </div>

              <button onClick={()=>{deleteCita(selectedRow.id); closeModalDelete()}} className="btn delete-button">Eliminar Cita</button>
            </div>
          </ModalComponent>
      </div>
    )
    if(!rows) return <Empty />
  };
  const Citas = () =>{

    return(
      <div className="center flex flex-col">
        <TableCitas />
      </div>
    )
  }
  export default Citas;