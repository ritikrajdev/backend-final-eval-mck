import * as formServices from '../../src/services/form.services.js';

const dbFormCreateFn = jest.fn().mockResolvedValue({ anything: 1 });
jest.mock('../../src/models/index.js', () => {
  const db = {
    Form: {
      create: dbFormCreateFn,
    },
  };
  return db;
});

describe('formServices', () => {
  describe('createForm', () => {
    it('should call db.Form.create with correct params and return db', async () => {
      const result = await formServices.createForm('name', 'schema', 'userId');
      expect(dbFormCreateFn).toHaveBeenCalledTimes(1);
      expect(dbFormCreateFn).toHaveBeenCalledWith({
        name: 'name',
        schema: 'schema',
        userId: 'userId',
      });
      expect(result).toEqual({ anything: 1 });
    });
  });
});
