import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
const fsReadDir = promisify(fs.readdir);
const asyncExec = promisify(exec);
import { GitAnswer } from './contentHandlers'

class GitHelper {  
  readdir(name: string): Promise<Array<string>> {
    return fsReadDir(name);
  }

  getCommitsNumber(path: string, hash: string): Promise<GitAnswer> {
    return asyncExec(`git rev-list --count ${hash}`, { cwd: path })
  }
  
  getCommitDiff(path: string, hash: string): Promise<GitAnswer> {
    return asyncExec(`git diff ${hash} ${hash}^~1`, { cwd: path })
  }
  
  getCommits(path: string, hash: string, paginatedCommits: string): Promise<GitAnswer>  {
    return asyncExec(`git log ${hash} --pretty=format:"%h %ad" ${paginatedCommits}`, { cwd: path })
  }
  
  getGitInfoAboutFile(path: string, hash: string, name: string): Promise<GitAnswer> {
    return asyncExec (`git log ${hash} --pretty=format:" lastCommit - %h, message - %s, committer - %an, commitDate - %cr" -1 ${name}`, 
    { cwd: path })
  }
  
  getBlob(path: string, hash: string, fileName: string): Promise<GitAnswer> {
    return asyncExec(`git show ${hash}:${fileName}`, { cwd: path })
  }
  
  deleteFile(command: string): Promise<GitAnswer> {
    return asyncExec(`${command}`)
  }
  
  cloneRepo(url: string, repositoryId: string, dir: string): Promise<GitAnswer> {
    return asyncExec(`git clone ${url} ${repositoryId}`, { cwd: dir })
  }
}

export { GitHelper }