import Time_slots from "../models/time_slot.models.js";
import Reservation from "../models/Reservation.model.js";
import Project from "../models/admin.model.js";
import dayjs from "dayjs"
import { generarIntervalos30min } from '../libs/time.js';
import { string } from "zod";
export const createTime_slot = async (req,res) => {
    const { id_reservation, id_project, date, startTime, endTime} = req.body;
    try {
        const time_slot = await Time_slots.create({ id_project, id_reservation, date, startTime, endTime });
        res.status(201).json(time_slot);
    } catch (error) {
        
    }
}
export const crearSlots = async (id, startDateTime, endDateTime, id_project) => {
  const registros = [];
  //validar qu elas fechas sean validad
  if (!(startDateTime instanceof Date) || !(endDateTime instanceof Date)) {
    throw new Error('Las entradas deben ser objetos Date válidos');
  }
  //Asegurarnos de que la fecha la entrada es anteriro a la salida
  if (startDateTime >= endDateTime) {
    throw new Error('la hora de inicio debe ser mayor a la')
  }
  //Crear copias spara no midficar la fechas originbales
  let currentTime = new Date(startDateTime.getTime()) ; 
  let endTime = new Date(endDateTime.getTime()) ;
  //redondear current time a el interlovalo de  30 minutos anterior mas cercano
  const minutes = currentTime.getMinutes();
  if (minutes % 30 !== 0){
    currentTime.setMinutes( minutes - (minutes % 30));
    currentTime.setSeconds(0)
    currentTime.setMilliseconds(0)
  }
  //generrar intervalos 
  while ( currentTime < endTime) {
    const nextTime = new Date(currentTime.getTime() + 30 * 60000);
    //si el siguinete intervalo supera la hora de slaida lo ajustamos 
    const intervalEnd = (nextTime > endTime) ? endTime : nextTime;
    //Formatear la fecha como DD-MM-YYYY 
    let  stringDAte = String(startDateTime);
     stringDAte.slice(0,9);
   const finallyDate = dayjs(stringDAte)
   
    //formatear las horas
    const startHours = String(currentTime.getHours()).padStart(2,'0');
    const startMinutes  = String(currentTime.getMinutes()).padStart(2,'0');
    const endHours = String(intervalEnd.getHours()).padStart(2,'0');
    const  endMinutes = String(intervalEnd.getMinutes()).padStart(2,'0');
    registros.push({
      id_reservation: id,
      id_project: id_project,
      date:finallyDate,
      startTime:`${startHours}:${startMinutes}`,
      endTime: `${endHours}:${endMinutes}`
    })
    currentTime =  nextTime
  }
    
    // Crear slots en lote ignorando duplicados
    await Time_slots.bulkCreate(registros, {
      ignoreDuplicates: true,
    });
  };
export const getTime_slots = async (req, res) => {
    try {
      const time_slot = await Time_slots.findAll( {
        include :[{ model: Project, attributes: ['name'] }],
        include :[{ model: Reservation, attributes: ['service'] }],
        where: { id_project: req.params.id} // Incluir la relación con Project
      });
      if (time_slot) {
        res.status(200).json(time_slot);
      } else {
        res.status(404).json({ message: "No se encontraron resrvciones en esos timepos" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener time_slot", error });
    }
  };
  export async function isSlotAvailable(id_project,date,startTime, endTime) {
    const intervalosSolicitados = generarIntervalos30min(startTime, endTime);
    
    for (const intervalo of intervalosSolicitados) {
      const [start, end] = intervalo.split('-');
      
      // Buscar solapamientos
      const solapado = await Time_slots.findOne({
        where: {
          id_project, // Asegúrate de que esta variable esté definida
          date,
          [Sequelize.Op.or]: [
            {
              start_time: { [Sequelize.Op.lt]: end.trim() },
              end_time: { [Sequelize.Op.gt]: start.trim() },
            },
            {
              start_time: start.trim(),
              end_time: end.trim(),
            }
          ]
        }
      });
  
      if (solapado) return false;
    }
  
    return true;
  }
export const update = async (req, res) => {
  try {
    const { id_reservation, id_project, date, startTime, endTime} = req.body;

    const [updated] = await Time_slots.update(
      { id_project, id_reservation, date, startTime, endTime },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedTime_slots = await Time_slots.findByPk(req.params.id);
      res.status(200).json(updatedTime_slots);
    } else {
      res.status(404).json({ error: 'Time_slots no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const deleteTime_slot = async (req, res) => {
    try {
      const deleted = await Time_slots.destroy({ where: { id: req.params.id } });
      if (deleted) {
        res.status(204).json({ message: 'Time_slots eliminado' });
      } else {
        res.status(404).json({ error: 'Time_slots no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
// Crear una nueva cita
/* const newAppointment = await Appointment.create({
    id_project: 1,
    id_reservation: 5,
    date: '2025-03-14',
    startTime: '09:00:00',
    endTime: '10:30:00'
  });
  
  // Buscar citas por proyecto
  const projectAppointments = await Appointment.findAll({
    where: { id_project: 1 },
    include: ['reservation'] // Carga relacionada
  }); */
  
  // Obtener citas entre fechas
  /* const rangeAppointments = await Appointment.findAll({
    where: {
      date: {
        [Op.between]: ['2025-03-01', '2025-03-31']
      }
    }
  }); */