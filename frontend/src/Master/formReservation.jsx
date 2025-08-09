import { useState, useEffect, useMemo } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Table from "../components/Table.jsx";
import ModalComponent from "../components/Modal.jsx";
import { Button, Empty } from "antd";
import {  AppointmentFormX2 } from "../components/FormR.jsx";
import "../css/table.css";
import { useAdmin } from "../context/adminProvider.jsx";
import { notyf } from '../lib/notyf.js';
import { formatCustomDate } from "../lib/formatDate.js"; 
import Popover from "../components/Popover.jsx";
import { CrearReservation } from '../components/Aform.jsx';

const TableRepresentante = () => {
  // Context and state
  const { 
    selectedProject, 
    deleteReservation, 
    horasLibres, 
    getReservation,
    getServices,
    services, 
    crearReservation, 
    updateReservation, 
    reservations 
  } = useAdmin();

  // Modal states
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [serviceOptionsl, setServiceOptions] = useState();

  // Modal handlers
  const openModal = () => setIsModalOpen(true);
  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);
  const openModalEdit = () => setIsModalOpenEdit(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalEdit = () => setIsModalOpenEdit(false);

  // Form fields configuration
  const [fields, setFields] = useState([]);
  const [fieldsEdit, setFieldsEdit] = useState([]);

  // Fetch data on mount and when selectedProject changes
  useEffect(() => {
    if (selectedProject?.id) {
      getReservation(selectedProject.id);
      getServices(selectedProject.id);
    }
  }, [selectedProject?.id]);

  // Set form fields when services are available
  useEffect(() => {
    if (services && selectedProject) {
      const serviceOptions = services.map(service => 
        `${service.name} (${service.time}) minutos)`
      );
      setServiceOptions(serviceOptions);
      const commonFields = [
        {
          name: 'id',
          label: 'ID',
          type: 'number',
          validation: { required: "Requerido" },
          defaultValue: selectedProject.id
        },
        {
          name: 'service',
          label: 'Servicio',
          type: 'select',
          options: serviceOptions,
        },
        {
          name: 'startDateTime',
          label: 'Start Date Time',
          type: 'datetime-local',
          validation: { required: "Requerido" }
        },
        {
          name: 'schedule',
          label: 'Horario del día',
          type: 'select',
          options: horasLibres || ['Por favor escoja una fecha']
        },
        {
          name: 'clientName',
          label: 'Client Name',
          type: 'text',
          validation: { required: "Requerido" }
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          validation: { required: "Requerido" }
        }
      ];

      setFields([
        ...commonFields,
        {
          name: 'phone',
          label: 'Phone',
          type: 'tel',
          validation: { required: "Requerido" }
        }
      ]);

      setFieldsEdit([
        ...commonFields,
        {
          name: 'clientPhone',
          label: 'Phone',
          type: 'tel',
          validation: { required: "Requerido" }
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          options: ['pendiente', 'cancelado', 'finalizado'],
        }
      ]);
    }
  }, [services, selectedProject, horasLibres]);

  // Event handlers
  const handleClick = (row) => {
    setSelectedRow(row);
    setIsEditMode(true);
    openModalEdit();
  };

  const handleAddProject = () => {
    if (selectedProject) {
      setIsEditMode(false);
      return openModal();
    }
    notyf.error('No se ha seleccionado un usuario');
  };

  const handleClickDelete = (row) => {
    openModalDelete();
    setSelectedRow(row);
  };

  const handleDelete = () => {
    if (selectedRow?.id) {
      deleteReservation(selectedRow.id);
      closeModalDelete();
    }
  };

  // Memoized table data
  const headers = useMemo(() => [
    'Project', 'Service', 'Start Date', 'End Date', 'Client Name', 'Phone', 'Email', 'Status', 'Actions'
  ], []);

  const rows = useMemo(() => {
    if (!reservations) return null;
    
    return reservations.map(e => [
      e.Project?.name || '',
      e.service,
      formatCustomDate(e.startDateTime),
      formatCustomDate(e.endDateTime),
      e.clientName,
      e.clientPhone,
      <Popover key={`email-${e.id}`} title={'Email'} text={e.email} />,
      e.status,
      <div key={`actions-${e.id}`}>
        <Button onClick={() => handleClick(e)}> 
          <EditOutlined />
        </Button>
        <Button onClick={() => handleClickDelete(e)} danger> 
          <DeleteOutlined />
        </Button>
      </div>
    ]);
  }, [reservations]);

  // Early returns
  if (!selectedProject) return <Empty description="No hay proyecto seleccionado" />;
  if (!rows) return <Empty description="Cargando reservaciones..." />;

  // Main render
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6"> 
        <h1 className="text-2xl font-bold text-gray-800">Tabla de Citas</h1>
        <Button type="primary" onClick={handleAddProject}> 
          Agregar Reservación
        </Button>
      </div>
      
      <Table headers={headers} rows={rows} />
      
      {/* Add Reservation Modal */}
      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        <AppointmentFormX2  callback={closeModal} func={crearReservation} libre={horasLibres} selectedProject={selectedProject.id} services={serviceOptionsl}/>
      </ModalComponent>
      
      {/* Edit Reservation Modal */}
      <ModalComponent isOpen={isModalOpenEdit} onClose={closeModalEdit}>
        <AppointmentFormX2 libre={horasLibres} selectedProject={selectedProject.id} services={serviceOptionsl} />
      </ModalComponent>
      
      {/* Delete Confirmation Modal */}
      <ModalComponent isOpen={isModalDeleteOpen} onClose={closeModalDelete}>
        <div className="text-center p-4">
          <h3 className="text-lg font-medium mb-2">¿Estás seguro de eliminar esta reservación?</h3>
          {selectedRow && (
            <p className="mb-4">
              La cita para el cliente {selectedRow.clientName} el día {formatCustomDate(selectedRow.startDateTime)}
            </p>
          )}
          <div className="flex justify-center gap-4">
            <Button onClick={closeModalDelete}>Cancelar</Button>
            <Button type="primary" danger onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

const Reservation = () => {
  return (
    <div className="center flex flex-col">
      <TableRepresentante />
    </div>
  );
};

export default Reservation;