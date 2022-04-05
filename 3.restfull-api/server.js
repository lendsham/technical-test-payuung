const http = require('http')
const app = require('./index')
const port = process.env.PORT || 8001

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`running on port ${port}`);
})