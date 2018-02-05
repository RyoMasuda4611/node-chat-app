const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isReading', () => {
  it('should reject non-string value', () => {
    var nonString = 123;
    expect(isRealString(nonString)).toBeFalsy();
  });
  it('should reject string with only space', () => {
    var space = ' ';
    expect(isRealString(space)).toBeFalsy();
  });
  it('should allow string non-space character', () => {
    var str = 'ryo masuda';
    expect(isRealString(str)).toBeTruthy();
  });
});