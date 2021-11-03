const { rm, mkdir } = require('fs/promises');
const SimpleDb = require('../lib/simple-db');

describe('simple db', () => {
  const rootDir = './__tests__/store';

  beforeEach(async () => {
    await rm(rootDir, { force: true, recursive: true });
    await mkdir(rootDir, { recursive: true });
  });

  it('saved object has id', async () => {
    const db = new SimpleDb(rootDir);

    const Elmo = { name: 'Elmo', type: 'Super 8mm' };

    await db.save(Elmo);
    expect(Elmo.id).toEqual(expect.any(String));
  });

  it('save and get an object', async () => {
    const db = new SimpleDb(rootDir);

    const Elmo = { name: 'Elmo', type: 'Super 8mm' };
    await db.save(Elmo);
    const got = await db.get(Elmo.id);
    expect(got).toEqual(Elmo);
  });

  it('returns null for non-existant id', async () => {
    const db = new SimpleDb(rootDir);

    const got = await db.get('non-existant');
    expect(got).toBeNull();
  });

  it('gets all objects', async () => {
    const moviecameras = [
      { name: 'Elmo', type: 'Super 8mm' },
      { name: 'Beaulieu', type: 'Super8mm and 16mm' },
      { name: 'Nikon', type: 'Super 8mm' },
    ];

    const db = new SimpleDb(rootDir);

    await Promise.all(moviecameras.map((moviecamera) => db.save(moviecamera)));
    const got = await db.getAll();
    expect(got).toEqual(expect.arrayContaining(moviecameras));
  });

  it('deletes an object', async () => {
    const db = new SimpleDb(rootDir);

    const Elmo = { name: 'Elmo', type: 'Super 8mm' };

    await db.save(Elmo);
    await db.delete(Elmo.id);
    const got = await db.get(Elmo.id);
    expect(got).toBeNull();
  });

  it('updates an object', async () => {
    const db = new SimpleDb(rootDir);

    const Elmo = { name: 'Elmo', type: 'Super 8mm' };
    await db.save(Elmo);

    Elmo.type = 'Super 8mm';
    await db.update(Elmo);

    const got = await db.get(Elmo.id);
    expect(got).toEqual(Elmo);
  });
});
