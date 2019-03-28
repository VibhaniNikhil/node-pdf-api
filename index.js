var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// const request = require('request');
// const cheerio = require('cheerio');

// request('https://news.ycombinator.com', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var html = cheerio.load(html);
//     html('span.comhead').each(function(i, element){
//       // var a = $(this).prev();
//       element.children.map(result => {
//         console.log("result", result.parent.attribs)
//       })

//     });
//   }
// });

const port = process.env.PORT || 3000;

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true,
};

const connectWithRetry = () => {
  mongoose
    .connect('mongodb://mongo:27017/test', options)
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch(err => {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
      console.log('err', err);
      setTimeout(connectWithRetry, 5000);
    });
};

// connectWithRetry();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes')(app);

app.listen(port, function() {
  console.log(`Your code listen on localhost: ${port}`);
});
