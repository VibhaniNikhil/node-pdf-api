function verify(req, res, next) {
  console.log('Here');
  next();
}

module.exports = verify;
