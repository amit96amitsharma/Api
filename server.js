const app = require('./bin/api')
const http = require('http');

const port = process.env.port || 3000;

let server = http.createServer(app);


app.listen(port);

console.log('Node server running on port 3000');