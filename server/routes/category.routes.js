import { Router } from 'express';
import { createcategory, getcategorys, getcategoryById, updatecategory, deletecategory } from '../controllers/category.controller.js';

const router = Router();

router.post('/category', createcategory);
router.get('/category', getcategorys);
router.get('/category/:id', getcategoryById);
router.put('/category/:id', updatecategory);
router.delete('/category/:id', deletecategory);

export default router;