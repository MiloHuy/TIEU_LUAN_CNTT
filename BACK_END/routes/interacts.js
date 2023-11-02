const express = require('express');
const router = express.Router();

const {
    follow,
    addfriend,
    accept,
    refuse,
    unfriend,
    block,
} = require('../controllers/interactController.js');

router.post('/follow', follow);
router.post('/addfriend', addfriend);
router.post('/accept', accept);
router.post('/accept', refuse);
router.post('/unfriend', unfriend);
router.post('/block', block);

module.exports = router;