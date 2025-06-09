const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.get('/', userCtrl.getAll);
router.get('/:id', userCtrl.getOne);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.remove);

module.exports = router;
