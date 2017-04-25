const Promise = require('bluebird');
const R = require('ramda');

const fs = require('fs');
const csvParser = Promise.promisify(require('csv-parse'));

const exec = Promise.promisify(require('child_process').exec);

const index = R.findIndex(R.equals('-f'), process.argv);
const file = process.argv[index + 1];

console.log("Using file: ", file);

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('client connected');
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  fs.watchFile(file, {interval: 200}, (curr, prev) => {
    console.log(file);
    console.log('file changed!');
    ws.send('fileChanged');
  });

  ws.send('something');
});


const init = router => {
  router.get('/api', (req, res) => {
    res.json({message: 'hi! again!'});
  });

  router.post('/api', (req, res) => {
    const {cmd} = req.body;
    const command = `hledger -f ${file} ${cmd} -O csv`;
    return exec(command).then( result => {
      return csvParser(result);
    }).then( data => {
      /*
      const header = R.head(data);
      const json = R.compose(
        R.map(R.zipObj(header)),
        R.tail
      )(data);
      */
      res.json(data);
    }).catch( e => {
      res.json({message: e.message});
    });
  });
};

module.exports = {
  init
};
