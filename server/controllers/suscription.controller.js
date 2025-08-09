import Subscription from "../models/suscription.model.js";
import User from "../models/user.model.js";
import Plan from "../models/plan.model.js";

// Crear una nueva suscripción
export async function createSubscription(req, res) {
    try {
        const { id_user, id_plan, startDate, endDate, status } = req.body;
        const newSubscription = await Suscription.create({
            id_user,
            id_plan,
            startDate,
            endDate,
            status
        });
        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }
  // controllers/subscriptionController.js
export const getSubscriptionsForCalendar = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll({
            include: [
                { model: User, attributes: ['name'] }, // Incluye el nombre del usuario
                { model: Plan, attributes: ['name'] }  // Incluye el nombre del plan
            ]
        });

        // Formatear para FullCalendar
        const events = subscriptions.flatMap(sub => [
            {
                title: `Inicio: ${sub.User.name} - ${sub.Plan.name}`,
                start: sub.startDate,
                allDay: true,
                backgroundColor: 'green', // Color para el inicio
                borderColor: 'darkgreen'
            },
            {
                title: `Fin: ${sub.User.name} - ${sub.Plan.name}`,
                start: sub.endDate,
                allDay: true,
                backgroundColor: 'red', // Color para el fin
                borderColor: 'darkred'
            }
        ]);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Obtener todas las suscripciones con datos relacionados
export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll({
            include: [
                { model: User, attributes: ['name'] }, // Incluye el nombre del usuario
                { model: Plan, attributes: ['name'] }  // Incluye el nombre del plan
            ]
        });

        // Formatear la respuesta para mostrar los datos relacionados
        const formattedSubscriptions = subscriptions.map(sub => ({
            id: sub.id,
            startDate: sub.startDate,
            endDate: sub.endDate,
            status: sub.status,
            userName: sub.User.name, // Nombre del usuario
            planName: sub.Plan.name  // Nombre del plan
        }));

        res.status(200).json(formattedSubscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  // Obtener todas las suscripciones
 
  
  // Obtener una suscripción por ID
  export async function getSubscriptionById(req, res) {
    try {
      let  id_user  = req.params.id
        const subscription = await Subscription.findOne({where: { id_user }});
        if (subscription) {
            res.status(200).json(subscription);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }
  
  // Actualizar una suscripción
  export async function updateSubscription(req, res) {
    try {
        const { id_user, id_plan, startDate, endDate, status } = req.body;
        const subscription = await Subscription.findByPk(req.params.id);
        if (subscription) {
            subscription.id_user = id_user;
            subscription.id_plan = id_plan;
            subscription.startDate = startDate;
            subscription.endDate = endDate;
            subscription.status = status;
            await subscription.save();
            res.status(200).json(subscription);
        } else {
            res.status(404).json({ message: 'Suscripción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }
  
  // Eliminar una suscripción
  export async function deleteSubscription(req, res) {
    try {
        const subscription = await Subscription.findByPk(req.params.id);
        if (subscription) {
            await subscription.destroy();
            res.status(204).json({ message: 'Suscripción eliminada' });
        } else {
            res.status(404).json({ message: 'Suscripción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }