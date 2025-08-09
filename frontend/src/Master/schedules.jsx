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


const TableSchedules = () => {
    // Definir los encabezados de la tabla
    const { getSchedules, schedules, selectedProject, createSchedule,updateSchedule, deleteSchedule} = useAdmin();

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
      getSchedules(selectedProject.id);
      console.log(selectedProject);
      
      },[]);
      const fields = [
        {
          name: 'id_project',
          type: 'number',
          label: 'ID del Proyecto',
          validation: {
            require: 'El ID del proyecto es obligatorio'
          },
          defaultValue: selectedProject ? selectedProject.id : ''
        },
        {
          name: 'day_of_week',
          type: 'select',
          label: 'Día de la Semana',
          options: [
            { value: 'Lunes', label: 'Lunes' },
            { value: 'Martes', label: 'Martes' },
            { value: 'Miércoles', label: 'Miércoles' },
            { value: 'Jueves', label: 'Jueves' },
            { value: 'Viernes', label: 'Viernes' },
            { value: 'Sábado', label: 'Sábado' },
            { value: 'Domingo', label: 'Domingo' }
          ],
          validation: {
            required: 'Selecciona un día de la semana'
          }
        },
        {
          name: 'start_time',
          type: 'time',
          label: 'Hora de Inicio',
          validation: {
            required: 'La hora de inicio es obligatoria',
            pattern: /^([01]\d|2[0-3]):([0-5]\d)$/,
            patternMessage: 'Formato inválido (use HH:MM)'
          }
        },
        {
          name: 'end_time',
          type: 'time',
          label: 'Hora de Fin',
          validation: {
            required: 'La hora de fin es obligatoria',
            pattern: /^([01]\d|2[0-3]):([0-5]\d)$/,
            patternMessage: 'Formato inválido (use HH:MM)',
            validate: (value, formValues) => {
              if (value <= formValues.start_time) {
                return 'La hora de fin debe ser posterior a la hora de inicio';
              }
              return true;
            }
          }
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
    const headers = ['id_project', 'day_of_week', 'start_time', 'end_time', 'actions'];
   
    let rows; 
    // Definir las filas de la tabla
    if (schedules){
      rows =  schedules.map(e => [
        e.Project.name,
        e.day_of_week,
        formataHora( e.start_time ),
        formataHora(e.end_time),
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tabla de Horarios</h1>
        <Button className="primary" onClick={handleAddProject}> agregar</Button>
        </div>
         <Table headers={headers} rows={rows} />
         <ModalComponent isOpen={isModalOpen} onClose={closeModal} >
            <FormN  block={'id_project'} functionS={createSchedule} fields={fields} buttonText={'Crear'} title={'Crear Schedulesentante'} callback={closeModal}/>
         </ModalComponent> 
        <ModalComponent isOpen={isModalOpenEdit} onClose={closeModalEdit} >
            <FormN   row={selectedRow}
            fields={fields}
            block={'id_project'}
            functionS={updateSchedule}
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

              <button onClick={()=>{deleteSchedule(selectedRow.id); closeModalDelete()}} className="btn delete-button">Eliminar Projecto</button>
            </div>
          </ModalComponent>
      </div>
    )
    if(!rows) return <Empty />
  };
  const Schedules = () =>{

    return(
      <div className="center flex flex-col">
        <TableSchedules />
      </div>
    )
  }
  export default Schedules;