const express = require('express');
const router = express.Router();
const prodCtrl = require('../controllers/productController');

router.get('/', prodCtrl.getAll);
router.get('/:id', prodCtrl.getOne);
router.post('/', prodCtrl.create);
router.put('/:id', prodCtrl.update);
router.delete('/:id', prodCtrl.remove);

module.exports = router;
