const UserRoute = require('./user/userRoute')

module.exports = function(app) {
    app.use('/user/api', UserRoute)
}