const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors');

const setup = require('./setup.js');

const app = express()
const router = express.Router()

app.use(bodyParser.json());
app.use(methodOverride());

app.use(cors({
  credentials: false,
  exposedHeaders: 'X-Total-Count'
}));

setup.init(router);

app.use(router)

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
})
