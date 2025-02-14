const AuthRouter = require('./auth-route')
const VerificationRouter = require('./verification-route')
const ProductRouter = require('./product-route')
const PostRouter = require('./post-route')
const HistoryRouter = require('./history-route')
const ChatRouter = require('./chat-route');

const routes =  (app) => {
    app.use('/api/auth', AuthRouter);
    app.use('/api/verification', VerificationRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/post', PostRouter);
    app.use('/api/history', HistoryRouter);
    app.use('/api/chat', ChatRouter);
}

module.exports = routes;