const axios = require('axios');

function verify(req, res, next) {
  next();
}

module.exports = verify;
