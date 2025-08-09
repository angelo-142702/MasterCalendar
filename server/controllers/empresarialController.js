import  Representante from "../models/Representantes.js"

const Representante = require('./models/Representante'); // Asegúrate de importar el modelo

// 1. Crear un nuevo representante
export  async function crearRepresentante(id_project, name, email, phone, foto = null) {
  try {
    const nuevoRepresentante = await Representante.create({
      id_project,
      name,
      email,
      phone,
      foto,
    });
    return nuevoRepresentante;
  } catch (error) {
    console.error('Error al crear el representante:', error);
    throw error;
  }
}

// 2. Leer un representante por su ID
export async function obtenerRepresentantePorId(id_repre) {
  try {
    const representante = await Representante.findByPk(id_repre);
    if (!representante) {
      throw new Error('Representante no encontrado');
    }
    return representante;
  } catch (error) {
    console.error('Error al obtener el representante:', error);
    throw error;
  }
}

// 3. Leer todos los representantes
export async function obtenerTodosLosRepresentantes() {
  try {
    const representantes = await Representante.findAll();
    return representantes;
  } catch (error) {
    console.error('Error al obtener los representantes:', error);
    throw error;
  }
}

// 4. Actualizar un representante por su ID
export async function actualizarRepresentante(id_repre, nuevosDatos) {
  try {
    const representante = await Representante.findByPk(id_repre);
    if (!representante) {
      throw new Error('Representante no encontrado');
    }
    const representanteActualizado = await representante.update(nuevosDatos);
    return representanteActualizado;
  } catch (error) {
    console.error('Error al actualizar el representante:', error);
    throw error;
  }
}

// 5. Eliminar un representante por su ID
export async function eliminarRepresentante(id_repre) {
  try {
    const representante = await Representante.findByPk(id_repre);
    if (!representante) {
      throw new Error('Representante no encontrado');
    }
    await representante.destroy();
    return { mensaje: 'Representante eliminado correctamente' };
  } catch (error) {
    console.error('Error al eliminar el representante:', error);
    throw error;
  }
}

// Exportar las funciones

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
    }
  });