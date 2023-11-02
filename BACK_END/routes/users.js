const express = require('express');
const router = express.Router();

const {
    getAll,
    disabled ,
} = require('../controllers/userController.js');

router.get('/admin', getAll);
router.delete('/admin/:id', disabled);

module.exports = router;