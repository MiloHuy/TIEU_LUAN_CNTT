const postsRouter = require('./posts');
const storiesRouter = require('./stories');
const meRouter = require('./me');

function route(app) {
    app.use('/me', meRouter);
    app.use('/posts', postsRouter);
    app.use('/stories', storiesRouter);

}

module.exports = route;
