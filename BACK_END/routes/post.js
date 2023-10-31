const express = require('express');
const router = express.Router();

const {
    getPosts
} = require('../controllers/postController.js');

//router.route('/posts').get(getPosts);
router.get('/posts', getPosts);


module.exports = router;