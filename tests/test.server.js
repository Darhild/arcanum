const app = require('../server/app').app;
const formatCodeForFileTable = require('../server/app').formatCodeForFileTable;
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');

describe('requests', () => {
  describe('Response JSON', () => {
    it('should be responded as json', (done) => {
      request(app)
        .get('/api/repos')
        .expect('Content-Type', /application\/json/)
        .expect(200, done);
    })
  })   

  describe('Check repository access', () => {
    it('should response with error if directory does not exist', (done) => {
      request(app)
        .get('/api/repos/zzz')
        .expect('Content-Type', /application\/json/)
        .expect(404)
        .then((res) => {
          res.body.should.have.property('error');
          done();
        })
    })
  }) 

  describe('Check repository access', () => {
    it('should response with error if directory does not exist', (done) => {
      request(app)
        .get('/api/repos/zzz')
        .expect('Content-Type', /application\/json/)
        .expect(404)
        .then((res) => {
          res.body.should.have.property('error');
          done();
        })
    })
  })    
})

describe('formatting', () => {
  describe('.formatCodeForFileTable(string)', () => {
    it('should format string and return with object', () => {
      const string = "name - 1, type - folder, lastCommit - 888777, message - message1, committer - a, commitDate - 5 weeks ago";

      const result = formatCodeForFileTable(string);

      const expected = { name: '1',
          type: 'folder',
          lastCommit: '888777',
          message: 'message1',
          committer: 'a',
          commitDate: '5 weeks ago' } ;

      console.log(result);
      console.log(expected);
           
      assert.equal(result, expected);
    })
  })   
})

