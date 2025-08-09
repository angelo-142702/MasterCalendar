// routes/subscriptionRoutes.js
import { Router } from 'express';
import { createSubscription, getAllSubscriptions, getSubscriptionById, updateSubscription,getSubscriptionsForCalendar ,deleteSubscription } 
from '../controllers/suscription.controller.js'
const router = Router();

router.post('/', createSubscription);
router.get('/', getAllSubscriptions);
router.get('/cal/', getSubscriptionsForCalendar);
router.get('/:id', getSubscriptionById);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;