import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Convertir la URL del módulo a una ruta de archivo
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, '../uploads'); // Ruta de la carpeta 'uploads'
        cb(null, uploadsDir); // Guarda los archivos en la carpeta 'uploads'
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // Obtiene la extensión del archivo
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Nombre único para el archivo
    },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error('Tipo de archivo no permitido'), false); // Rechaza el archivo
    }
};

// Configuración de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Límite de 5MB
    },
});

export default upload;