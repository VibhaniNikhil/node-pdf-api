const axios = require('axios');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const path = require('path');
const fs = require('fs');

async function getUser(req, res) {
  // // The previous script start
  // Promise.all(
  //   [
  //     axios.get('https://jsonplaceholder.typicode.com/posts'),
  //   ].map(result => result.then(row => ({ status: 200, data: row.data })).catch(err => ({ status: 404 })))
  // )
  //   .then(result => {
  //     res.json({ data: result });
  //   })
  //   .catch(err => res.json({ data: err }));
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

async function getPdf(req, res) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();  
  await page.goto(req.query.url, {waitUntil: 'domcontentloaded'});
  await page.pdf({ path: 'uploads/medium.pdf', margin: {
    top     : 0,
    right   : 0,
    bottom  : 0,
    left    : 0,
  },
  printBackground: true, format: 'A4' });  
  await browser.close();

  try {
    var filePath = `${path.resolve(__dirname, '../../')}/uploads/medium.pdf`;
    await fs.readFile(filePath, function(err, data) {
      res.contentType('application/pdf');
      res.send(data);
    });
  }
  catch(err){
    res.send(err)
  }
}

module.exports = {
  getUser,
  addUser,
  getOneUser,
  getPdf,
};
