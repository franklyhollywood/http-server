const parseBody = require('./parse-body');
const SimpleDb = require('./simple-db');

const db = new SimpleDb(`${__dirname}/../__tests__/store`);

const moviecameraRouter = {
  async post(req, res) {
    const moviecamera = await parseBody(req);
    await db.save(moviecamera);
    const savedmoviecamera = await db.get(moviecamera.id);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(savedmoviecamera));
  },

  async get(req, res) {
    const [, , id] = req.url.split('/');

    console.log(`GET /moviecamera/${id}`);

    if (id) {
      // Get a moviecamera by its id
      const moviecamera = await db.get(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(moviecamera));
    } else {
      // Get all moviecameras
      const moviecameras = await db.getAll();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(moviecameras));
    }
  },

  async Put(req, res) {
    //the request (What's in the URL)
    const [, , id] = req.url.split('/');
    const moviecamera = await parseBody(req);
    await db.update({ ...moviecamera, id });
    const newMoviecamera = await db.get(id);
    //What we are sending back: Response
    res.statuscode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newMoviecamera));
  },

  async delete(req, res) {
    //What we get from the URL:
    const [, , id] = req.url.split('/');
    const moviecamera = await db.delete(id);
    //What we are sending back:
    res.statuscode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(moviecamera));
  },
};

module.exports = moviecameraRouter;
