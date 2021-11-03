const moviecameraRouter = require('./moviecameras.js');

const routes = {
  moviecamera: moviecameraRouter,
};

const app = async (req, res) => {
  //pulls moviecamera from actual route: resource = moviecamera at this point:
  const [, resource] = req.url.split('/');
  //using bracket notation to select the correct router
  const route = routes[resource];

  if (route) {
    try {
      const routeHandlerFn = route[req.method.toLowerCase()];
      await routeHandlerFn(req, res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(err.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
};

module.exports = app;
