const postRoutes = require('./postRoutes');
module.exports = (router) => {
    router.use('/api/v1', postRoutes())

    return router;
}