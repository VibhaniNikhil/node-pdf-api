const axios = require('axios');

async function getUser(req, res) {

  Promise.all(
    [
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/posts'),
    ].map(result => result.then(row => ({ status: 200, data: row.data })).catch(err => ({ status: 404 })))
  )
    .then(result => {
      res.json({ data: result });
    })
    .catch(err => res.json({ data: err }));
  // axios
  //   .get('http://dummy.restapiexample.com/api/v1/employees')
  //   .then(result => {
  //     res.json({ data: result.data });
  //   })
  //   .catch(e => {
  //     res.json({ data: 'rer' });
  // });
}

function addUser(req, res) {
  const { firstName, lastName } = req.body;
  res.json(req.body);
}

function getOneUser(req, res) {
  res.json({ data: req.params });
}

module.exports = {
  getUser,
  addUser,
  getOneUser,
};
