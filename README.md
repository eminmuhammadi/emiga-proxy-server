# EmiGA Proxy Server
Full customizeable proxy server compatible with SSL

## Installing
```bash
npm install
```
## Running
```bash
npm run dev
```
## Configuration
### server/proxy.js
```js
const options = {
    server : {
        port : {
        'http'  : 80,
        'https' : 443
        },
        // Change common address
        gateway : '0.0.0.0'
    },
    /**
     *  Certification path for SSL
     */
    key:   fs.readFileSync(path.join(__dirname, '../config/key.pem')),
    cert:  fs.readFileSync(path.join(__dirname, '../config/cert.pem')),

    // Change common passphrase
    passphrase: 'EMIGA-PROXY-SERVER'
};
```
### server/server.js
```js
const options = {
    // Fake server ports
    server_port    : [9000,9001,9002,9003,9004,9005,9006,9007,9008,9009],
    server_gateway : '127.0.0.1',

    // Fake Proxy server sign in credientals
    credentials : {
        name : 'admin',
        pass : 'admin'
    }
};
```
### server/proxy.js
```js
// Load balancer for Proxy server
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
```

### Generate Certification

```bash
sudo apt-get install openssl
```

```bash
cd config && openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

The CSR needs to contain the following attributes:

- Country Name (C): Use the two-letter code without punctuation for country
- State or Province (S): Spell out the state completely; do not abbreviate the state or province name
- Locality or City (L): The Locality field is the city or town name
- Organization (O): Your company or department
- Organizational Unit (OU): This field is the name of the department or organization unit making the request.
- Common Name (CN): The Common Name is the Host Name or Domain Name. Example "www.domain.com" or "domain.com".