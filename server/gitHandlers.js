const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const fsReadDir = promisify(fs.readdir);
const asyncExec = promisify(exec);

const gitHelper = {  
  async readdir(name) {
    return await fsReadDir(name);
  },

  async getCommitsNumber(path, hash) {
    return await asyncExec(`git rev-list --count ${hash}`, { cwd: path })
  },
  
  async getCommitDiff(path, hash) {
    return await asyncExec(`git diff ${hash} ${hash}^~1`, { cwd: path })
  },
  
  async getCommits(path, hash, paginatedCommits) {
    return await asyncExec(`git log ${hash} --pretty=format:"%h %ad" ${paginatedCommits}`, { cwd: path })
  },
  
  async getGitInfoAboutFile(path, hash, name) {
    return await asyncExec (`git log ${hash} --pretty=format:" lastCommit - %h, message - %s, committer - %an, commitDate - %cr" -1 ${name}`, 
    { cwd: path })
  },
  
  async getBlob(path, hash, fileName) {
    return await asyncExec(`git show ${hash}:${fileName}`, { cwd: path })
  },
  
  async deleteFile(command) {
    return await asyncExec(`${command}`)
  },
  
  async cloneRepo(url, repositoryId, dir) {
    return await asyncExec(`git clone ${url} ${repositoryId}`, { cwd: dir })
  }
}

module.exports = {
  gitHelper: gitHelper
}