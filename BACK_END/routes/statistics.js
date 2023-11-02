const express = require('express');
const router = express.Router();

const {
    getPosts,
    getStories,
    getFollower,
    getFollowing,
    getFriend,
} = require('../controllers/statisticsController.js');

router.get('/', getPosts, getStories, getFollower, getFollowing, getFriend);

module.exports = router;