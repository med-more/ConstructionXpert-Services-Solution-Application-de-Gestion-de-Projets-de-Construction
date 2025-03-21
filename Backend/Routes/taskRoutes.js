const express = require('express');
const {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../Controllers/taskController');

const router = express.Router();

router.post('/', createTask);

router.get('/project/:projectId', getTasksByProject);

router.get('/:id', getTaskById);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

module.exports = router;