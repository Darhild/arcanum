const test = require('./../../server/contentHandlers');
const { gitHelper } = require('../../server/gitHelper');
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
    describe('right commits pagination', () => {
      for(let i=0; i < 5; i++) {
        let max = Math.floor(Math.random() * 100); 
        let showFrom = Math.floor(Math.random() * 100);   
        let number = Math.floor(Math.random() * 100);
        sinon.stub(gitHelper, 'getCommitsNumber').returns({stdout: `${number}`});

        it(`should return ${max} commits`, async() => {
            const commitsMessage = await test.getPaginatedCommitsInfo(0, max);  
            if(max > 0 && max <= number) expect(commitsMessage).to.include(`-n ${max}`);
            else expect(commitsMessage).to.not.include(`-n ${max}`);
        })  

        it(`should show commits from ${showFrom}`, async() => {
          const commitsMessage = await test.getPaginatedCommitsInfo(showFrom, max);  

          if(showFrom > 0 && showFrom < number && showFrom < max) expect(commitsMessage).to.include(`--skip=${showFrom - 1}`);
          else expect(commitsMessage).to.not.include(`--skip=${showFrom - 1}`);
        }) 

        gitHelper.getCommitsNumber.restore()
      }            
    })  
  })

  describe('showFilesInfo', () => {     
    beforeEach(() => {
      const dirContent = ['dir 1', 'dir 2', 'file1.txt'];
      sinon.stub(gitHelper, 'readdir').resolves(dirContent);    
      const stub = sinon.stub(gitHelper, 'getGitInfoAboutFile');
      
      stub.onFirstCall().resolves({stdout:  " lastCommit - aaabbbb, message - gitIt, committer - Keks, commitDate - 9 weeks ago"});
      stub.onSecondCall().resolves({stdout:  " lastCommit - cccdddd, message - gitIt, committer - Keks, commitDate - 9 weeks ago"})
      stub.onThirdCall().resolves({stdout:  " lastCommit - nnnmmmm, message - gitIt, committer - Keks, commitDate - 9 weeks ago"})
    })

    afterEach(() => {
      gitHelper.readdir.restore() 
      gitHelper.getGitInfoAboutFile.restore();        
    })

    it('should return right file types', async() => {
      const result = await test.showFilesInfo('a/b'); 
      expect(result[0]).to.have.property('type', 'folder');
      expect(result[2]).to.have.property('type', 'file');
    })

    it('should return object with right length', async() => {    
      const result = await test.showFilesInfo('a/b');
      expect(result).to.be.an('array').with.lengthOf(3);
    })    

    it('should return object with right commitNames', async() => {    
      const result = await test.showFilesInfo('a/b');

      expect(result[0]).to.have.own.property('lastCommit', 'aaabbbb');
      expect(result[1]).to.have.own.property('lastCommit', 'cccdddd');
      expect(result[2]).to.have.own.property('lastCommit', 'nnnmmmm');
    })  
  })

  describe('showFileInfo', () => {
    it('should return commits list', async() => {     
      const commits = {stdout: 'aaabbbb Thu Sep 5 00:00:00 2019 +0300\ncccdddd Thu Sep 8 00:00:00 2019 +0300'};

      sinon.stub(gitHelper, 'getCommits').resolves(commits);
       
      const result = await test.showCommits();  
            
      expect(result).to.be.an('array').with.lengthOf(2);
      checkArrayItems(result, ['aaabbbb', 'cccdddd'], ['Thu Sep 5 00:00:00 2019 +0300', 'Thu Sep 8 00:00:00 2019 +0300']);

      gitHelper.getCommits.restore();
    })  
  })
})

function checkArrayItems(result, key, value) {
  for(let i=0; i < result.length; i++) {
      expect(result[i]).to.have.own.property(key[i], value[i]);  
  }
}
