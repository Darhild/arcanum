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

      gitHelper.readdir.restore();
    })  
  }) 

  describe('showCommits', () => {
    it('should return commits list', async() => {     
      const commits = {stdout: 'aaabbbb Thu Sep 5 00:00:00 2019 +0300\ncccdddd Thu Sep 8 00:00:00 2019 +0300'};

      sinon.stub(gitHelper, 'getCommits').resolves(commits);
       
      const result = await test.showCommits();  
            
      expect(result).to.be.an('array').with.lengthOf(2);
      checkArrayItems(result, ['aaabbbb', 'cccdddd'], ['Thu Sep 5 00:00:00 2019 +0300', 'Thu Sep 8 00:00:00 2019 +0300']);

      gitHelper.getCommits.restore();
    })  
  })

  describe('getPaginatedCommitsInfo', () => {
    describe('right max number', () => {
      beforeEach(() => {
        const max = Math.floor(Math.Random() * 100); 
        const showFrom = Math.floor(Math.Random() * 100);   
        const number = Math.floor(Math.Random() * 100);
        sinon.stub(gitHelper, 'getCommitsNumber').resolves(50);     
      })      

      for(let i=0; i < 50; i++) {
        it(`should return ${max} commits`, async(max, showFrom, number) => {
            const commitsNumber = test.getPaginatedCommitsInfo(0, max);
            
            if(max > 0 && max <= number) expect(commitsNumber).to.be.an('array').with.lengthOf(max);  
            if(max > number) expect(commitsNumber).to.be.an('array').with.lengthOf(number);
        })  

        it(`should show commits from ${showFrom}`, async() => {
          const commitsNumber = test.getPaginatedCommitsInfo(showFrom, max);  

          if(showFrom > 0 && showFrom <= number) expect(commitsNumber).to.be.an('array').with.lengthOf(max - showFrom);  
          if(showFrom > number || showFrom > max) expect(commitsNumber).to.be.an('array').with.lengthOf(number);
        }) 
      }  

      afterEach(() => {
        gitHelper.getCommitsNumber.restore()
      })      
    })

    describe('right offset', () => {


    })    
  })
})

function checkArrayItems(result, key, value) {
  for(let i=0; i < result.length; i++) {
      expect(result[i]).to.have.own.property(key[i], value[i]);  
  }
}
