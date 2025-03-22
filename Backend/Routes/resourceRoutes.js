const express = require('express');
const {
  createResource,
  getResourcesByTask,
  getResourceById,
  updateResource,
  deleteResource,
} = require('../Controllers/resourceController');

const router = express.Router();

router.post('/', createResource);

router.get('/task/:taskId', getResourcesByTask);

router.get('/:id', getResourceById);

router.put('/:id', updateResource);

router.delete('/:id', deleteResource);

module.exports = router;