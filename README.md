# hledger-node-server
This is a light node API server for hledger.  

It take's hledger's csv output and turns it into JSON and serves it.

## Getting started 

You need hledger installed on your system.

See http://hledger.org/download.html

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

This isn't secure as people could put malicous stuff in cmd.  But it's useful if your server is bound to localhost and you want to experiment.

## Front end

In `/app` there is a small React front end.  You can tell it
what command you want hledger to execute and it'll make a bar
chart for the balance command and a line graph for the register
command. 

My plan is to have server also serve this, but I haven't gotten
around to it yet.  You have to cd into the `/app` folder and run 
`npm install` then `npm start`.

Happy hacking!


