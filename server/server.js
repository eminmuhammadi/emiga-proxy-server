const app     = require('express')();
const http    = require('http');
var   auth    = require('basic-auth');
var   compare = require('tsscmp');

/**
 *  Port configuration for Fake Servers
 *  10 Server Created
 */
const options = {
    server_port    : [9000,9001,9002,9003,9004,9005,9006,9007,9008,9009],
    server_gateway : '127.0.0.1',
    credentials : {
        name : 'admin',
        pass : 'admin'
    }
};

/**
 *  Fake Pages
 */
app.get('/', function(req,res) { 
    var credentials = auth(req);
 
    if (!credentials || !check(credentials.name, credentials.pass , options.credentials)) 
    {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="Please enter your credientals."');
      res.end('Access denied');
    } 
    else {
      res.send('Hello World');
    }
});

/**
 *  Check Credientals
 */
function check (name, pass ,credentials) {
    var valid = true;
    
    valid = compare(name, credentials.name) && valid;
    valid = compare(pass, credentials.pass) && valid;
   
    return valid;
};

/**
 *  Fake Servers for Testiong purpose
 */
for (i = 0; i < 10; i++) { 

    const port = options.server_port[i];

    /**
     *  Server Create
     */
    http.createServer(app).listen(port,options.server_gateway, ()=> 
    console.log('Server running on '+options.server_gateway+' via port '+port));
}; 