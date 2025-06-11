const express = require('express');
const router = express.Router();
const imageCtrl = require('../controllers/manageImage');

router.get('/:name', imageCtrl.getByName);
router.post('/', imageCtrl.create);
router.put('/:name', imageCtrl.updateByName);


module.exports = router;
