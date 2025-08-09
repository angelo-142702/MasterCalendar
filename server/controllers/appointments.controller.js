import Appointment from '../models/appointments.model.js';
import Project from '../models/admin.model.js';
import Schedule from '../models/schedules.model.js';
// Crear una nueva cita
export async function createAppointment(req, res) {
    try {
        const { id_repre, id_schedule, date, hora, status, observation } = req.body;
        
        const newAppointment = await Appointment.create({
            id_repre,
            id_schedule,
            date,
            hora,
            status: status || 'pending',
            observation
        });
        
        res.status(201).json({
            success: true,
            data: newAppointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
// Obtener todas las citas
export async function getAllAppointments(req, res) {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}
// Obtener una cita por ID
export async function getAppointmentById(req, res) {
    try {
        const appointment = await Appointment.findAll({
              include :[{ model: Project, attributes: ['name'] },{ model: Schedule } ],
              where: { id_project: req.params.id} // Incluir la relación con Project
            });
        
        if (!appointment) {
            return res.status(404).json({ error: 'cita no encontrado' });
        }
        
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Actualizar una cita
export async function updateAppointment(req, res) {
    try {
        const { id } = req.params;
        const { id_repre, id_schedule, date, hora, status, observation } = req.body;
        
        const appointment = await Appointment.findByPk(id);
        
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        
        appointment.id_repre = id_repre || appointment.id_repre;
        appointment.id_schedule = id_schedule || appointment.id_schedule;
        appointment.date = date || appointment.date;
        appointment.hora = hora || appointment.hora;
        appointment.status = status || appointment.status;
        appointment.observation = observation || appointment.observation;
        
        await appointment.save();
        
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Eliminar una cita
export async function deleteAppointment(req, res) {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({ error: 'la cita no fue encontrada'});
        }
        
        await appointment.destroy();
        
        res.status(200).json({ message: 'cita eliminado' });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

