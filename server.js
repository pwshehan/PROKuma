const http = require('http');
const app = require('./app')

async function serverStart() {
    const port = process.env.PORT || 3000;
    const server = http.createServer(app);
    await server.listen(port);
}

serverStart();