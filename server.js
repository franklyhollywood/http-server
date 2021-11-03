//http requires http library:
const http = require('http');
//app requires the app.js file I need to write still.
const app = require('./lib/app');
//The port to listen on.  It can be put in .env file if you have one, OR....
const PORT = process.env.PORT || 7890;
//server = create server const and pull in app.js
const server = http.createServer(app);
//Create server, and listen on PORT, when connected, display console log message:
server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
