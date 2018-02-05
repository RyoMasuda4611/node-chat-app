const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
      users = new Users();
      users.users = [{
          id: '1',
          name: 'ryo',
          room: 'node course'
      },
      {
        id: '2',
        name: 'masuda',
        room: 'node course'
    },
    {
        id: '3',
        name: 'jonie',
        room: 'react course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
        id: '123',
        name: 'Ryo',
        room: 'masudake'
    }
    var newUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user])
  });

  it('should remove user', () => {
     var resUser = users.removeUser('1');
     expect(resUser.id).toBe('1');
     expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var resUser = users.removeUser('4');
    expect(resUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should get user', () => {
    var resUser = users.getUser('1');
    expect(resUser.id).toBe('1');
  });

  it('should not get user', () => {
    var resUser = users.getUser('4');
    expect(resUser).toBeFalsy();
  });

  it('should get users list', () => {
    var usersName = users.getUserList('node course');
    expect(usersName).toEqual(['ryo','masuda']);
  });
});
