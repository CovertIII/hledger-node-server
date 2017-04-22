const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const setup = require('./setup.js');

const app = express()
const router = express.Router()

app.use(bodyParser.json());
app.use(methodOverride());

setup.init(router);

app.use(router)

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
})
