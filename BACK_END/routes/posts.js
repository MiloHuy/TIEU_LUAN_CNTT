const express = require('express');
const router = express.Router();

const {
    getAll,
    getPost,
    create,
    store,
    edit,
    update,
    destroy,
    adminGetAll,
    adminDestroy,
} = require('../controllers/postController.js');

router.get('/:id', getPost);
router.get('/create', create);
router.get('/:id/edit', edit);
router.post('/store', store);
router.put('/:id', update);
router.delete('/:id', destroy);

router.get('/admin/get', adminGetAll);
router.delete('/admin/:id', adminDestroy);

router.get('/', getAll);



module.exports = router;