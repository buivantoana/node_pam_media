const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/categoryController');

router.get('/', categoryCtrl.getAll);
router.get('/:id', categoryCtrl.getOne);
router.post('/', categoryCtrl.create);
router.put('/:id', categoryCtrl.update);
router.delete('/:id', categoryCtrl.remove);

module.exports = router;
