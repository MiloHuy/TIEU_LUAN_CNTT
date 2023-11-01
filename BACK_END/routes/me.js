const express = require('express');
const router = express.Router();

const {
    getPosts,
    getStories,
} = require('../controllers/meController.js');

router.get('/stored/posts', getPosts);
router.get('/stored/stories', getStories);


module.exports = router;