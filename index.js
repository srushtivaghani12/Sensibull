

const express = require('express')
const bodyparser = require('body-parser');
const cors = require('cors');


const port = process.env.PORT || '19093';

var app = express();

var routes = require('./routes')


app.use(cors());
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({ extended: false, limit: '50mb', parameterLimit:50000 }));


app.use('/api',routes)

app.get('/', (req, res) => {
  res.send('Welcome To Newbiz new update V.9.24');
});


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
