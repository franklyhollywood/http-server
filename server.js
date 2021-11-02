//http requires http library:
const http = require('http');
//app requires the app.js file I need to write still.
const app = require('./lib/app');
//The port to listen on.  It can be put in .env file if you have one, OR....
const port = process.env.PORT || 7890;
//
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('server running on port 7890');
});
