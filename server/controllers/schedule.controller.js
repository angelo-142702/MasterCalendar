import Schedule from "../models/schedules.model.js";
import Project from "../models/admin.model.js";
// Crear un nuevo horario
export async function create(req, res) {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener todos los horarios
export async function findAll(req, res) {
  try {
    const schedules = await Schedule.findAll();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener un horario por ID
export const findOne = async (req, res) => {
 try {
  const { id } = req.params; // Obtener el ID de los parámetros

  if (!id) {
    return res.status(400).json({ error: 'ID no proporcionado' });
  }
     const schedule = await Schedule.findAll( {
       include :[{ model: Project, attributes: ['name'] }],
       where: { id_project: id} // Incluir la relación con Project
     });
     if (schedule) {
       res.status(200).json(schedule);
     } else {
       res.status(404).json({ error: 'Schedule no encontrado' });
     }
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
}

// Actualizar un horario por ID
export async function update(req, res) {
  try {
    const [updated] = await Schedule.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSchedule = await Schedule.findByPk(req.params.id);
      return res.json(updatedSchedule);
    }
    return res.status(404).json({ message: 'Schedule not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Eliminar un horario por ID
export const deleteSchedule = async (req, res) => {
    try {
        const deleted = await Schedule.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.json({ message: 'Schedule deleted' });
        }
        return res.status(404).json({ message: 'Schedule not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};