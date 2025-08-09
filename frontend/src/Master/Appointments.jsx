import { useState } from "react";
import { EditOutlined , DeleteOutlined  } from "@ant-design/icons";
import { useEffect } from "react";
import  Table  from "../components/Table.jsx";
import ModalComponent from "../components/Modal.jsx";
import { Button }from"antd";
import { FormAppointment  } from "../components/FormR.jsx";
import "../css/table.css"
import { useAdmin } from "../context/adminProvider.jsx";
import {notyf} from '../lib/notyf.js';
import { Empty } from 'antd';
import Popover from "../components/Popover.jsx";
import ReservationForm from "../components/MasterFormReservation.jsx";
const TableRepresentante = () => {
    // Definir los encabezados de la tabla
    const { selectedProject, getAppointments,deleteAppointment,projectsAll, createAppointments, updateAppointments, appointments} = useAdmin();

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
      getReservations(selectedProject.id);
      console.log(selectedProject);
      
      },[]);
      const fields = [
        {
          name: 'id_repre',
          label: 'ID Representante',
          type: 'select',
          options: [],
          validation: { required: "Requerido" },
        },
        {
          name: 'date',
          label: 'Fecha',
          type: 'date',
          validation: { required: "Requerido" },
        },
        {
          name: 'status',
          label: 'Estado',
          type: 'select',
          options: ['Pendiente', 'Confirmado', 'Cancelado'],
          validation: { required: "Requerido" },
        },
        {
          name: 'hora',
          label: 'Hora',
          type: 'time',
          validation: { required: "Requerido" },
        },
        {
          name: 'observation',
          label: 'Observaciones',
          type: 'textarea',
        },
      ];
    
    const handleClick = (row) =>{
      setSelectedRow(row)
      openModalEdit();
      console.log(row);
    }
    const handleAddProject = () =>{
      if (selectedProject) {
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
    const headers = ['id','startDateTime','endDateTime','clientName','phone','email','status'];
   
    let rows; 
    // Definir las filas de la tabla
    if (appointments){
      rows =  appointments.map(e => [
        e.startDateTime,
        e.endDateTime,
        e.clientName,
        e.clientPhone,
        e.email,
        e.staus,
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tabla de Citas</h1>
        <Button className="primary" onClick={handleAddProject}> agregar</Button>
        </div>
         <Table headers={headers} rows={rows} />
         <ModalComponent isOpen={isModalOpen} onClose={closeModal} >
         {/* <FormAppointment
          functionS={createAppointments}
          callback={closeModal}
          fields={fields}
          /> */}
          <ReservationForm projects={projectsAll}/>
         </ModalComponent> 
        <ModalComponent isOpen={isModalOpenEdit} onClose={closeModalEdit} >
        <FormAppointment
          row={selectedRow}
          functionS={updateAppointments}
          callback={closeModalEdit}
          isEditMode={true}
          fields={fields}
         />
         </ModalComponent>  
         <ModalComponent   isOpen={isModalDeleteOpen} onClose={closeModalDelete}>
            <div className="center">
              <div>
              <h3>Estas seguro de eliminar</h3>
              { selectedRow && <p>la cita para el día {selectedRow.Schedule}</p> }
              </div>

              <button onClick={()=>{deleteAppointment(selectedRow.id); closeModalDelete()}} className="btn delete-button">Eliminar Projecto</button>
            </div>
          </ModalComponent>
      </div>
    )
    if(!rows) return <Empty />
  };
  const Appointments = () =>{

    return(
      <div className="center flex flex-col">
        <TableRepresentante />
      </div>
    )
  }
  export default Appointments;