// backend/app.js
import { schedule } from 'node-cron'; // Importa la librería node-cron para programar tareas
import { Op } from 'sequelize'; // Importa el operador "Op" de Sequelize para hacer consultas avanzadas
import { update } from './models/Subscription'; // Importa el modelo de suscripciones

// Tarea programada para desactivar suscripciones
schedule('0 0 * * *', async () => {
    try {
        // Obtiene la fecha actual
        const today = new Date();

        // Calcula la fecha de hace 3 días
        const threeDaysAgo = new Date(today.setDate(today.getDate() - 3));

        // Actualiza las suscripciones que cumplen con las condiciones
        await update(
            { status: 'inactive' }, // Cambia el estado a "inactive"
            {
                where: {
                    endDate: { [Op.lte]: threeDaysAgo }, // Fecha de finalización es menor o igual a hace 3 días
                    status: 'active' // Solo suscripciones que están activas
                }
            }
        );

        // Mensaje de éxito en la consola
        console.log('Suscripciones desactivadas correctamente.');
    } catch (error) {
        // Mensaje de error en la consola si algo falla
        console.error('Error al desactivar suscripciones:', error);
    }
});