import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, notification } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import api from '../api/axios.js'; // Tu cliente API configurado
import { useAdmin } from '../context/adminProvider.jsx';
import { notyf } from '../lib/notyf.js';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReservationForm = ({ projects }) => {
  const { schedulesfree, fetchSchedules, projectsAll, fetchServices, services, selectedProject } = useAdmin()
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fecha, setFecha] = useState('');
   
  // Obtener horarios cuando selecciona proyecto
  useEffect(() => {
    if (selectedProject) fetchSchedules(selectedProject.id);
  }, [form.getFieldValue('projectId')]);

  // Obtener servicios cuando selecciona proyecto
  useEffect(() => {
    

    if (selectedProject) fetchServices(selectedProject.id);
  }, [form.getFieldValue('projectId')]);

  

  // Calcular tiempo final basado en servicio
  const calculateEndTime = (start, duration) => {
    return dayjs(start).add(duration, 'minutes').toDate();
  };

  // Manejar cambio de servicio
  const handleServiceChange = (value) => {
    const selectedService = services.find(s => s.id === value);
    const start = form.getFieldValue('startDateTime');
    
    if (selectedService && start) {
      const end = calculateEndTime(start, selectedService.duration);
      form.setFieldsValue({ endDateTime: end });
    }
  };

  // Validar contra horarios
  const validateSchedule = async (start) => {
    const dayOfWeek = dayjs(start).day();
    const schedule = await schedulesfree.find(s =>  s.day_of_week == 'Miércoles');
    
    if (!schedule) {
      console.log('no se encunetra en el horario de trabajo');
      console.log(schedule);
      
      return false;

    }

    const [startHour, startMinute] = schedule.start_time.split(':').map(Number);
    const [endHour, endMinute] = schedule.end_time.split(':').map(Number);

    const scheduleStart = dayjs(start)
      .set('hour', startHour)
      .set('minute', startMinute);
    
    const scheduleEnd = dayjs(start)
      .set('hour', endHour)
      .set('minute', endMinute);

    return dayjs(start).isAfter(scheduleStart) && 
           dayjs(end).isBefore(scheduleEnd);
  };

  // Enviar formulario
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const isValidSchedule = validateSchedule(values.startDateTime, values.endDateTime);
      
      if (!isValidSchedule) {
        notyf.error('Fuera del horario laboral' );
        return;
      }

      const isAvailable = await checkAvailability(
        values.startDateTime,
        values.endDateTime,
        values.projectId
      );

      if (!isAvailable) {
        notyf.error( 'Horario ya reservado' );
        return;
      }

      await api.post('/reservation', values);
      notification.success({ message: 'Reserva creada exitosamente' });
      console.log(values);
      
    } catch (error) {
      notification.error({ message: 'Error creando reserva' });
    } finally {
      setLoading(false);
    }
  };
  const fechaChange = () => {
    const start = form.getFieldValue('startDateTime');
    console.log('este es el valor de la fecha selecionada', start);
    
    
  }
  
  return (
    <Form form={form}   onFinish={handleSubmit} layout="vertical">

      <Form.Item
        name="serviceId"
        label="Servicio"
        rules={[{ required: true }]}
      >
        <Select 
          placeholder="Selecciona un servicio"
          onChange={handleServiceChange}
          disabled={(services)? false: true}
        >
          {services && services.map(service => (
            <Option key={service.id} value={service.id}>
              {service.name} ({service.time} ) minutos
            </Option>
          ))}
        </Select>
      </Form.Item>
      

      <Form.Item
        name="startDateTime"
        label="Fecha y hora de inicio"
        rules={[{ required: true }]}
        onChange={fechaChange}
      >
        <DatePicker
          
          format="YYYY-MM-DD"
          disabledDate={current => current < dayjs().startOf('day')}
        />
      </Form.Item>
      <Form.Item
        name="serviceId"
        label="Servicio"
        rules={[{ required: true }]}
      >
        <Select 
          placeholder="Selecciona un servicio"
          onChange={handleServiceChange}
          disabled={(services)? false: true}
        >
          {services && services.map(service => (
            <Option key={service.id} value={service.id}>
              {service.name} ({service.time} ) minutos
            </Option>
          ))}
        </Select>
      </Form.Item>
      
      {/* Campos restantes del cliente */}
      <Form.Item
        name="clientName"
        label="Nombre del cliente"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="clientPhone"
        label="Teléfono"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: 'email', required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Crear Reservación
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReservationForm;