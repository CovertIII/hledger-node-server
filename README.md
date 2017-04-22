# hledger-node-server
This is a light node API server for hledger.  

It take's hledger's csv output and turns it into JSON and serves it.

## Getting started 

You need hledger installed on your system.

You'll have to clone this repo.

Then run `npm install`

Then to start it up run `node index.js -f path/to/journal/file`

It serves on port 3000.

Example of hitting the endpoint.

```
POST 0.0.0.0:3000/api
{
	"cmd": "balance assets"
}
```

It will then execute this command `hledger -f ${file} ${cmd} -O csv` and turn the csv output into JSON and serve it back.

This isn't secure as people could put malicous stuff in cmd.  But it's useful if you're server is bound to localhost.

My plan is to write a React front end to dispaly some nice tables and charts with the data.

