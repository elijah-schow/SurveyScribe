const { expect } = require('chai');
const User = require('../models/user.js');

describe('User Model', () => {
  beforeEach((done) => {
    User.remove({}, done); // Empty the database to ensure predictablility
  });

  afterEach((done) => {
    User.remove({}, done); // Empty the database to ensure predictablility
  });

  describe('.hashPassword', () => {
    it('is a function', () => {
      expect(User.schema.methods.hashPassword).to.be.a('function');
    });

    it('returns a buffer', () => {
      const password = 'password123';
      const actual = User.schema.methods.hashPassword(password);
      expect(Buffer.isBuffer(actual)).to.be.true;
    });

    it('does not return the plain text password', () => {
      const password = 'password123';
      expect(User.schema.methods.hashPassword(password)).to.not.equal(password);
    });
  });

<<<<<<< HEAD
<<<<<<< HEAD
  describe('.verifyPassword', () => {
    it('is a function', () => {
      expect(User.schema.methods.verifyPassword).to.be.function;
=======
  describe('.authenticate', () => {
    it('is a function', () => {
      expect(User.schema.methods.authenticate).to.be.function;
>>>>>>> Fix schemas
=======
  describe('.verifyPassword', () => {
    it('is a function', () => {
      expect(User.schema.methods.verifyPassword).to.be.function;
>>>>>>> (fix) User test refers to an old function name
    });

    it('returns true if the password matches and false if it doesn\'t', (done) => {
      const expected = User.sample();
      const mistmatch = 'qwerty';
      User.create(expected)
      .then(user => User.findById(user._id, 'name hash').exec())
      .then((user) => {
<<<<<<< HEAD
<<<<<<< HEAD
        expect(user.verifyPassword(expected.password)).to.be.true;
        expect(user.verifyPassword(mistmatch)).to.be.false;
=======
        expect(user.authenticate(expected.password)).to.be.true;
        expect(user.authenticate(mistmatch)).to.be.false;
>>>>>>> Fix schemas
=======
        expect(user.verifyPassword(expected.password)).to.be.true;
        expect(user.verifyPassword(mistmatch)).to.be.false;
>>>>>>> (fix) User test refers to an old function name
        done();
      })
      .catch(done); // immediately output errors instead of timing out
    });
  });

  describe('.create', () => {
    it('is a function', () => {
      expect(User.create).to.be.function;
    });

    it('only saves password hashes', (done) => {
      const expected = User.sample();
      User.create(expected)
      .then((user) => {
        expect(user.password).to.be.undefined;
        expect(user.hash).to.exist;
        expect(Buffer.isBuffer(user.hash)).to.be.true;
<<<<<<< HEAD
<<<<<<< HEAD
        expect(user.verifyPassword(expected.password, user.hash));
=======
        expect(user.authenticate(expected.password, user.hash));
>>>>>>> Fix schemas
=======
        expect(user.verifyPassword(expected.password, user.hash));
>>>>>>> (fix) User test refers to an old function name
        done();
      })
      .catch(done); // immediately output errors instead of timing out
    });

    xit('rejects passwords shorter than 8 characters');
    xit('allows very long passwords');
    xit('allows uncommon symbols');
    xit('does not directly update password hashes');
  });

  describe('.findOne (and .find)', (done) => {
    it('should not return password hashes unless specifically requested', () => {
      const name = 'testuser@testing.com';
      const password = 'password123';
      User.create({ name, password })
      .then(() => User.find({}))
      .then((user) => { expect(user.hash).to.not.exist; })
      .then(() => User.findOne({}, 'name hash'))
      .then((user) => { expect(user.hash).to.exist; })
      .catch(done); // immediately output errors instead of timing out
    });
  });
});