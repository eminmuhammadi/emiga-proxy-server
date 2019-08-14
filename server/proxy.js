/**
 * @author Emin Muhammadi (https://github.com/eminmuhammadi)
 */
const app     = require('express')();
const fs      = require('fs');
const path    = require('path');
const https   = require('https');
const http    = require('http');
const proxy   = require('http-proxy-middleware');

/**
 *  Security
 */
app.use(require('helmet')());
app.use(require('compression')());
app.disable('x-powered-by');
app.set('trust proxy', ['127.0.0.1', '0.0.0.0']);


/**
 *  Main Configuration for Proxy Server
 */
const options = {
    server : {
        port : {
        'http'  : 80,
        'https' : 443
        },
        gateway : '0.0.0.0'
    },
    /**
     *  Certification path for SSL
     */
    key:   fs.readFileSync(path.join(__dirname, '../config/key.pem')),
    cert:  fs.readFileSync(path.join(__dirname, '../config/cert.pem')),
    passphrase: 'EMIGA-PROXY-SERVER'
};

/**
 *  Servers' List
 */
const list = [
    { target : 'http://127.0.0.1:9000' , name : 'admin' , pass : 'admin'},
    { target : 'http://127.0.0.1:9001' , name : 'admin' , pass : 'admin'},
    { target : 'http://127.0.0.1:9002' , name : 'admin' , pass : 'admin'},
    { target : 'http://127.0.0.1:9003' , name : 'admin' , pass : 'admin'},
    { target : 'http://127.0.0.1:9004' , name : 'admin' , pass : 'admin'},
    { target : 'http://127.0.0.1:9005' , name : 'admin' , pass : 'admin'},
    { target : 'http://127.0.0.1:9006' , name : 'admin' , pass : 'admin'},
    { target : 'http://127.0.0.1:9007' , name : 'admin' , pass : 'admin'},
    { target : 'http://127.0.0.1:9008' , name : 'admin' , pass : 'admin'},
    { target : 'http://127.0.0.1:9009' , name : 'admin' , pass : 'admin'}         
];

/**
 *  Create Targets
 */
const target = list.shift();


/**
 *  Connection with all requests
 */
app.use('/*',
    proxy({
        target:target.target,
        auth:target.name+':'+target.pass,
        changeOrigin: true, 
        secure:false,
        ws:false,
        timeout:7000,
        followRedirects:false,          
    }
));

/**
 *  Push Back Targets
 */
list.push(target.target);

/**
 *  Create Http Server
 */
http.createServer(app).listen(options.server.port.http);

/**
 *  Create Https Server
 */
https.createServer(options, app).listen(options.server.port.https, options.server.gateway, () => 
console.log(`\x1b[40m`,`\x1b[32m`,
`
     _______  __   __  ___   _______  _______ 
    |       ||  |_|  ||   | |       ||   _   |
    |    ___||       ||   | |    ___||  |_|  |
    |   |___ |       ||   | |   | __ |       |
    |    ___||       ||   | |   ||  ||       |
    |   |___ | ||_|| ||   | |   |_| ||   _   |
    |_______||_|   |_||___| |_______||__| |__|
 
    [+] Maintance      : https://github.com/eminmuhammadi/emiga-proxy-server.git
    [+] Server         : http://${options.server.gateway}:${options.server.port.http}
                         https://${options.server.gateway}:${options.server.port.https}

    [+] List Adresses  : `+JSON.stringify(list)+`
 
    [=] Running...............
    
`,`\x1b[0m`));
