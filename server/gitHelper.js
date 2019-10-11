const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const fsReadDir = promisify(fs.readdir);
const asyncExec = promisify(exec);

const gitHelper = {  
  readdir(name) {
    return fsReadDir(name);
  },

  getCommitsNumber(path, hash) {
    return asyncExec(`git rev-list --count ${hash}`, { cwd: path })
  },
  
  getCommitDiff(path, hash) {
    return asyncExec(`git diff ${hash} ${hash}^~1`, { cwd: path })
  },
  
  getCommits(path, hash, paginatedCommits) {
    return asyncExec(`git log ${hash} --pretty=format:"%h %ad" ${paginatedCommits}`, { cwd: path })
  },
  
  getGitInfoAboutFile(path, hash, name) {
    return asyncExec (`git log ${hash} --pretty=format:" lastCommit - %h, message - %s, committer - %an, commitDate - %cr" -1 ${name}`, 
    { cwd: path })
  },
  
  getBlob(path, hash, fileName) {
    return asyncExec(`git show ${hash}:${fileName}`, { cwd: path })
  },
  
  deleteFile(command) {
    return asyncExec(`${command}`)
  },
  
  cloneRepo(url, repositoryId, dir) {
    return asyncExec(`git clone ${url} ${repositoryId}`, { cwd: dir })
  }
}

module.exports = {
  gitHelper: gitHelper
}