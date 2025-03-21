const express = require('express');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../Controllers/projectController');

const router = express.Router();

router.post('/', createProject);

router.get('/', getAllProjects);

router.get('/:id', getProjectById);

router.put('/:id', updateProject);

router.delete('/:id', deleteProject);

module.exports = router;