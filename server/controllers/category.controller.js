import Category from '../models/category.model.js';
// Crear un nuevo ítem
export async function createcategory(req, res) {
  try {
    const { name } = req.body;
    const newcategory = await Category.create({ name });
    res.status(201).json(newcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtener todos los ítems
export async function getcategorys(req, res) {
  try {
    const categorys = await Category.findAll();
    res.status(200).json(categorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtener un ítem por ID
export async function getcategoryById(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Actualizar un ítem
export async function updatecategory(req, res) {
  try {
    const { name } = req.body;
    const [updated] = await Category.update({ name }, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedcategory = await findByPk(req.params.id);
      res.status(200).json(updatedcategory);
    } else {
      res.status(404).json({ error: 'category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar un ítem
export async function deletecategory(req, res) {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}