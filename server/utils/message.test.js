const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate correct message', () => {
    var from = 'ryo';
    var text = 'HI';
    var res = generateMessage(from, text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocation', () => {
  it('should generate correct location object', () => {
    var from = 'Admin'
    var latitude = 1;
    var longitude = 1;
    var location = generateLocationMessage(from, latitude, longitude);
    expect(location.from).toBe(from);
    expect(location.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(typeof location.createdAt).toBe('number');
  });
});
