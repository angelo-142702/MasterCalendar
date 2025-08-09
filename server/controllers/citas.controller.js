import Time_slots from "../models/time_slot.models.js";
import Reservation from "../models/Reservation.model.js"

export const crearCita = async(req, res) => {
    const { id_reservation, id_project, date, startTime, endTime} = req.body;
    try {
        const time_slot = await Time_slots.create({ id_project, id_reservation, date, startTime, endTime });
        res.status(201).json(time_slot);
    } catch (error) {
        
    }
}
export const getCita = async (req, res) => {
    try {
      const time_slot = await Time_slots.findAll( {
        include :[{ model: Reservation, attributes: [ 'id','service'] }],
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
export const updateCita = async(req, res) => {
  
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
export const deleteCita = async(req,res) =>{
  try{
    const deleted = await Time_slots.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Cita not found' });
    }
  }catch(e){
    console.log(e);
    
  }
  
}

