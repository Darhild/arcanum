const app = require('./../server/app');
const fs = require('fs');
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
/*
describe('server', () => {
  describe('.checkIfREpositoryExists(err, req, res, next)', () => {
    it('should give the list of directories', () => {
      const result1 = server.checkIfREpositoryExists();
      const result2 = server.checkIfREpositoryExists();
      assert.equal(result1, true);
      assert.equal(result2, false);
    })
  })   
})*/

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