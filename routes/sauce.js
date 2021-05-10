const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const isOwner = require('../middleware/isOwner');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllStuff);
router.post('/', auth, multer, sauceCtrl.createSauce); 
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, isOwner, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, isOwner, sauceCtrl.deleteSauce);

module.exports = router;