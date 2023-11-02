const meRouter = require('./me');
const postsRouter = require('./posts');
const storiesRouter = require('./stories');
const statisticsRouter = require('./statistics');
const interactsRouter = require('./interacts');
const usersRouter = require('./users');

function route(app) {
    app.use('/me', meRouter);
    app.use('/posts', postsRouter);
    app.use('/stories', storiesRouter);
    app.use('/statistics', statisticsRouter);
    app.use('/interacts', interactsRouter);
    app.use('/users', usersRouter);
}

module.exports = route;
