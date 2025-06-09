const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');

router.get('/', postCtrl.getAll);
router.get('/:id', postCtrl.getOne);
router.post('/', postCtrl.create);
router.put('/:id', postCtrl.update);
router.delete('/:id', postCtrl.remove);

module.exports = router;
