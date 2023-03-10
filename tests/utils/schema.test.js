import { createJoiSchema } from '../../src/utils/schema';

describe('createJoiSchema', () => {
  it('should return a joi schema object that validates correctly', () => {
    const schema = {
      name: 'text',
    };

    const joiSchema = createJoiSchema(schema);
    expect(joiSchema.validateAsync({ name: 'John' })).resolves.toEqual({
      name: 'John',
    });
  });
});
