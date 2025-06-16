const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.get('/', companyController.getAll);
router.get('/info', companyController.getInfo); // nếu chỉ có 1 bản ghi
router.get('/:id', companyController.getOne);
router.post('/', companyController.create);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.remove);
router.get('/primary', companyController.getPrimary);

module.exports = router;
