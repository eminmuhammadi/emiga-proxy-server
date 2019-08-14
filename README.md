# EmiGA Proxy Server
Full customizeable proxy server

## Installing
```bash
npm install
```
## Running
```bash
npm run dev
```

### Generate Certification

```bash
sudo apt-get install openssl
```

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

The CSR needs to contain the following attributes:

- Country Name (C): Use the two-letter code without punctuation for country
- State or Province (S): Spell out the state completely; do not abbreviate the state or province name
- Locality or City (L): The Locality field is the city or town name
- Organization (O): Your company or department
- Organizational Unit (OU): This field is the name of the department or organization unit making the request.
- Common Name (CN): The Common Name is the Host Name or Domain Name. Example "www.domain.com" or "domain.com".