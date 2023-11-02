const meRouter = require('./me');
const postsRouter = require('./posts');
const storiesRouter = require('./stories');
const statisticsRouter = require('./statistics');

function route(app) {
    app.use('/me', meRouter);
    app.use('/posts', postsRouter);
    app.use('/stories', storiesRouter);
    app.use('/statistics', statisticsRouter);
     

}

module.exports = route;
