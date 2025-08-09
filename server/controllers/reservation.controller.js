import Reservation from "../models/Reservation.model.js";
import Service from "../models/service.model.js";
import Schedule from "../models/schedules.model.js";
import Project from "../models/admin.model.js";
import Time_slots from "../models/time_slot.models.js";
import dayjs from 'dayjs';
import sequelize from "../db.js";
import {generarIntervalos30min, calcularHorariosDisponibles , recortarTexto, removeTimeSlots , formatDate} from '../libs/time.js';
import { crearSlots } from './time_solts.controller.js';
import { datetimeRegex } from "zod";

export const checkReservation= async (req, res) => {
    try {
      const { startDateTime, endDateTime, projectId } = req.body;
      
      // Validar campos requeridos
      if (!startDateTime || !endDateTime || !projectId) {
        return res.status(400).json({ 
          error: 'Todos los campos son requeridos: startDateTime, endDateTime, projectId' 
        });
      }

      // Convertir a Day.js
      const start = dayjs(startDateTime);
      const end = dayjs(endDateTime);
      
      // 1. Verificar contra el horario del proyecto
      const dayOfWeek = start.day(); // 0 (domingo) a 6 (sábado)
      
      const schedule = await Schedule.findOne({
        where: {
          projectId,
          day_of_week: dayOfWeek,
          isActive: true
        }
      });

      if (!schedule) {
        return res.json({ 
          available: false,
          reason: 'No hay horario disponible para este día' 
        });
      }

      // Convertir tiempos del horario a Day.js
      const [startHour, startMinute] = schedule.start_time.split(':').map(Number);
      const [endHour, endMinute] = schedule.end_time.split(':').map(Number);
      
      const scheduleStart = start.startOf('day')
        .hour(startHour)
        .minute(startMinute);
      
      const scheduleEnd = start.startOf('day')
        .hour(endHour)
        .minute(endMinute);

      // Validar rango contra el horario
      if (start.isBefore(scheduleStart) || end.isAfter(scheduleEnd)) {
        return res.json({
          available: false,
          reason: 'Fuera del horario laboral del proyecto'
        });
      }

      // 2. Verificar colisión con reservaciones existentes
      const overlapping = await Reservation.findOne({
        where: {
          projectId,
          [Op.and]: [
            { startDateTime: { [Op.lt]: end.toDate() } },
            { endDateTime: { [Op.gt]: start.toDate() } }
          ]
        }
      });

      return res.json({ 
        available: !overlapping,
        conflict: overlapping ? overlapping.id : null
      });

    } catch (error) {
      console.error('Error en check reservation:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

export const  deleteReservation = async (req, res) => {
  try {
    const deletedtime_solt = await Time_slots.destroy({ where: { id_reservation: req.params.id } });
    const deleted = await Reservation.destroy({ where: { id: req.params.id } });
    
    if (deleted && deletedtime_solt) {
      res.status(204).json({ message: 'Reservation eliminado' });

    } else {
      res.status(404).json({ error: 'Reservation no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 
  export const getReservations = async (req, res) => {
    try {
      const reservation = await Reservation.findAll( {
        include :[{ model: Project, attributes: ['name'] }],
       // include :[{ model: Service, attributes: ['name'] }],
        where: { id_project: req.params.id} // Incluir la relación con Project
      });
      if (reservation) {
        res.status(200).json(reservation);
      } else {
        res.status(404).json({ message: "No se encontraron resevaciones" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las reservaciones", error });
    }
  };
  export const verificarHorario = async (req,res) =>{
    try {
      const { id, dia, date, duration } = req.body;
      const schedules = await Schedule.findAll( {
             include :[{ model: Project, attributes: ['name'] }],
             where: { id_project: id} // Incluir la relación con Project
           });
           console.log('buscando valores\n',date,duration, id);
      
      const times_slogs = await Time_slots.findAll( {
        where: { id_project: id, date: date  } // Incluir la relación con Project
      });
      const busytime = times_slogs.map(slot => {
  return `${slot.dataValues.startTime} - ${slot.dataValues.endTime}`;
});

const scheduleX =  schedules.find(item => item.day_of_week === dia);

if ( !scheduleX ) return res.status(400).json({success:false, message: 'No laboaramos ese día de la semana'})
  const { start_time, end_time } = scheduleX;
  console.log(start_time,'y el final', end_time);

  const intervalosHorario = generarIntervalos30min(start_time, end_time);
  console.log(intervalosHorario);
  const play = removeTimeSlots(intervalosHorario, busytime);
      
      //console.log(intervalosHorario);
      // los 60 es para dividri y este expresado en horas
      const newintervalos  = calcularHorariosDisponibles( duration / 60 , play) 
      if (newintervalos) { 
          res.status(200).json({newintervalos})
      }
            
    } catch (error) {
       res.status(500).json({
              success: false,
              message: error.message
          });
    }

  }
export const  createReservation = async(req, res) => {
  try {
          const { id, service, date,time, name, phone, email} = req.body;
          const recorterService = recortarTexto(service);       
          console.log('----',id, service, date,time, name, phone, email);          
          //const fe  = {id_project: id, date: formatDate(date), service: recorterService, schedule: schedule, clientName: clientName, clientPhone: phone, email:email, status:'pendiente' }
                
          const [start, end] = time.split(' - ');
          const [startHora, startMinutos ] = start.split(':');
          const [endHora, endMinutos ] = end.split(':');
          const fechaStr = formatDate(date);
          const [dia, mes, anio] = fechaStr.split("/");
          const startTime = new Date(anio, mes - 1, dia); // Los meses en JS van de 0 a 11
          const endTime = new Date(anio, mes - 1, dia); // Los meses en JS van de 0 a 11

          // Agregar la hora (ejemplo: 15:30:00)
          startTime.setHours( parseInt( startHora)); // Horas (0-23)
          startTime.setMinutes(parseInt(startMinutos));
          startTime.setSeconds(0);
          startTime.setMilliseconds(0);
          endTime.setHours(parseInt(endHora)); // Horas (0-23)
          endTime.setMinutes(parseInt(endMinutos));
          endTime.setSeconds(0);
          endTime.setMilliseconds(0);
          console.log({
             id_project: parseInt(id),
             startDateTime: startTime,
             endDateTime: endTime,
             service: recorterService,
             clientName: name,
             clientPhone: phone,
             email:email,
             status:'pendiente' });
             

          const newReservation = await Reservation.create({
             id_project: parseInt(id),
             startDateTime: startTime,
             endDateTime: endTime,
             service: recorterService,
             clientName: name,
             clientPhone: phone,
             email:email,
             status: 'pendiente' } );
          crearSlots(newReservation.id, startTime, endTime, id);
          res.status(201).json({ newReservation}); 
      } catch (error) {
        
         res.status(500).json({
              success: false,
              message: error.message
          }); 
      }
} 

