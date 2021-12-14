import { getInitials } from './getInitials';

describe('getInitials', () => {
  it('should return default response when passing an empty string', () => {
    const name = '';
    expect(getInitials(name)).toEqual('?');
  });

  it('should return JD', () => {
    const name = 'John Doe';
    expect(getInitials(name)).toEqual('JD');
  });
});
