const express = require('express');
const router = express.Router();

const {
    getAll,
    getStory,
    create,
    edit,
    store,
    update,
    destroy,
} = require('../controllers/storyController.js');

router.get('/', getAll);
router.get('/:id', getStory);
router.get('/create', create);
router.get('/:id/edit', edit);
router.post('/store', store);
router.put('/:id', update);
router.delete('/:id', destroy)

module.exports = router;