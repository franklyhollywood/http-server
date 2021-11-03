//We need supertest installed:
const request = require('supertest');
//from the promises library we need RM and MKDIR
const { rm, mkdir } = require('fs/promises');
//Lets require our app.js file
const app = require('../lib/app');
//Lets require simple DB
const SimpleDB = require('../lib/simple-db');
//This is where the database files will be stored: this is our root directory:
const rootDir = `${__dirname}/store`;
//Before each time we run the test, let's delete what's there and remake the folder
describe('moviecamera CRUD API', () => {
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  //After all the tests remove the root directory and make the directory.
  //Why do we do an afterAll after we do a Before each
  afterAll(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  //These are routes, correct?
  it('creates a new moviecamera and returns it via POST', async () => {
    //create an object called moviecamera with these parameters:
    const moviecamera = { brand: 'Elmo', model: '1012SXL', year: 1974 };
    //
    const res = await request(app).post('/moviecamera').send(moviecamera);

    expect(res.body).toEqual({ ...moviecamera, id: expect.any(String) });
  });
  //get a moviecamera by it's ID:
  it('gets a moviecamera by its id', async () => {
    const moviecamera = { brand: 'Elmo', model: '1012SXL', year: 1974 };
    const db = new SimpleDB(rootDir);
    await db.save(moviecamera);

    const res = await request(app).get(`/moviecamera/${moviecamera.id}`);

    expect(res.body).toEqual(moviecamera);
  });
  //Return all moviecameras when no ID is specified
  it('gets all moviecameras when no id specified', async () => {
    const Elmo = { brand: 'Elmo', model: '1012SXL', year: 1974 };
    const Beaulieu = { brand: 'Beaulieu', model: '4008ZMII', year: 1971 };
    const Nikon = { brand: 'Nikon', model: 'R10', year: 1973 };

    const db = new SimpleDB(rootDir);
    Promise.all([db.save(Elmo), db.save(Beaulieu), db.save(Nikon)]);

    const res = await request(app).get('/moviecamera');

    expect(res.body).toEqual(expect.arrayContaining([Elmo, Beaulieu, Nikon]));
  });
});
