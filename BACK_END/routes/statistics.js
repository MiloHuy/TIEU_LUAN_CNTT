const express = require('express');
const router = express.Router();

const {
    getPosts,
    getStories,
} = require('../controllers/statisticsController.js');

router.get('/posts', getPosts);
router.get('/stories', getStories);

module.exports = router;