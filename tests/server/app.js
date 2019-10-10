const test = require('./../../server/app');
const { gitHelper } = require('./../../server/gitHandlers');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('getContent', () => {
  describe('showRepos', () => {
    it('should return repos names', async() => {
      const dirs = ['dir1', 'dir2'];     

      sinon.stub(gitHelper, 'readdir').resolves(dirs);
       
      const result = await test.showRepos(); 

      expect(result).to.be.an('array').with.lengthOf(2);
      expect(result[0]).to.have.own.property('name', 'dir1');
      expect(result[1]).to.have.own.property('name', 'dir2');
    })  
  }) 

  describe('showCommits', () => {
    it('should return commits list', async() => {     
      const commits = {stdout: 'aaabbbb Thu Sep 5 00:00:00 2019 +0300\ncccdddd Thu Sep 8 00:00:00 2019 +0300'};

      sinon.stub(gitHelper, 'getCommits').resolves(commits);
       
      const result = await test.showCommits();  
            
      expect(result).to.be.an('array').with.lengthOf(2);
      checkArrayItems(result, ['aaabbbb', 'cccdddd'], ['Thu Sep 5 00:00:00 2019 +0300', 'Thu Sep 8 00:00:00 2019 +0300']);
    })  
  })
})


function checkArrayItems(result, key, value) {
  for(let i=0; i < result.length; i++) {
      expect(result[i]).to.have.own.property(key[i], value[i]);  
  }
}
