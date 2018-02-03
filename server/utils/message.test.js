const expect = require('expect');

const {generateMessage} = require('./message.js');

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
