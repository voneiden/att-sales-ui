import envValueToBoolean from './envValueToBoolean';

describe('envValueToBoolean', () => {
  it('returns defaultvalue when value passed is undefined', () => {
    expect(envValueToBoolean(undefined, true)).toEqual(true);
  });

  it('returns true when value passed is "1"', () => {
    expect(envValueToBoolean('1', false)).toEqual(true);
  });

  it('returns false when value passed is "0"', () => {
    expect(envValueToBoolean('0', true)).toEqual(false);
  });

  it('returns true when value passed is "true"', () => {
    expect(envValueToBoolean('true', false)).toEqual(true);
  });

  it('returns false when value passed is "false"', () => {
    expect(envValueToBoolean('false', true)).toEqual(false);
  });

  it('returns true when value passed is true', () => {
    expect(envValueToBoolean(true, false)).toEqual(true);
  });

  it('returns false when value passed is false', () => {
    expect(envValueToBoolean(false, true)).toEqual(false);
  });
});
