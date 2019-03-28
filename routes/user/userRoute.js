const Router = require('express').Router();
const userService = require('./userService');
const validate = require('../test');

Router.route('/getUser').get(validate, userService.getUser);
Router.route('/addUser').post(validate, userService.addUser);
Router.route('/getOneUser/:id').get(validate, userService.getOneUser);

module.exports = Router;
