
import * as path from 'path';
import * as os from 'os';
const userOs = os.type();
import { GitHelper } from './gitHelper';
import { formatCodeForReposList, formatCodeForCommitsContent, formatCodeForFileContent, formatCodeForFileTable, NumberedStrings, CommitInfo }from './formatters';

const gitHelper = new GitHelper;

export interface GitAnswer {
  stdout: string
}

export interface Message {
  err?: string,
  message?: string
}

export interface Error {
  error: string
}

export type FileText = Array<NumberedStrings> | Error;

export type FilesInfo = Array<CommitInfo> | Error;

export async function showRepos(dirName: string): Promise<object> {
  let result: object;

  try {
    let repos: Array<string> = await gitHelper.readdir(dirName);
    result = formatCodeForReposList(repos);  
  } 
  catch (err) {
    result = { error: err.message };    
  }

  return result;
}

export async function showDiff(repositoryPath: string, hash: string): Promise<object> {
  let result: object;

  try {
    let diff: GitAnswer = await gitHelper.getCommitDiff(repositoryPath, hash);
    result = formatCodeForFileTable(diff.stdout);
  }
  catch (err) {
    result = {err: err.message};    
  }

  return result;
}

export async function getPaginatedCommitsInfo(repositoryPath: string, hash: string, showFrom: number, showMax: number): Promise<string> {
  let numberOfCommits: number;
  let str: string = ""; 

  try {        
    let count: GitAnswer = await gitHelper.getCommitsNumber(repositoryPath, hash);    
    numberOfCommits = +count.stdout;    
  }
  catch(err) {
    return str;
  }      

  if (showFrom) {
    if (showFrom < numberOfCommits) str += ` --skip=${showFrom - 1}`;
  }

  if (showMax) {
    if (showMax > 0 && showMax <= numberOfCommits) str += ` -n ${showMax}`;
  }

  return str;
}

export async function showCommits(repositoryPath: string, hash: string, showFrom: number, showMax: number): Promise<object> {
  let paginatedCommits: string = "";

  if (showFrom || showMax) {
    paginatedCommits = await getPaginatedCommitsInfo(repositoryPath, hash, showFrom, showMax);
  }

  let result: object; 

  try {
    const commits: GitAnswer = await gitHelper.getCommits(repositoryPath, hash, paginatedCommits);
    result = formatCodeForCommitsContent(commits.stdout);
  }
  catch(err) {
    result = { error: err.message }
  }   

  return result;
}

export async function showFilesInfo(endpoint: string, hash: string): Promise<object> {
  let files: Array<string>;  

  try {
    files = await gitHelper.readdir(endpoint);
  } catch (err) {
    return({ error: err.message });
  }  

  let result: FilesInfo;

  try {
    const responses: Array<string> = await Promise.all(files.map(async(file: string): Promise<string> => { 
      let type: string = 'folder';
      if (path.extname(file)) type = 'file';
      const info: GitAnswer = await gitHelper.getGitInfoAboutFile(endpoint, hash, file); 
      return `name - ${file}, type - ${type}, ${info.stdout}`;
    }));

    result = responses.map(response => formatCodeForFileTable(response))
  }
  catch(err) {
    result = {error: err.message}
  } 

  return result;
}

export async function showFileContent(repositoryPath: string, hash: string, fileName: string): Promise<FileText> { 
  let result: FileText; 

  try {
    let data: GitAnswer = await gitHelper.getBlob(repositoryPath, hash, fileName);
    result = formatCodeForFileContent(data.stdout);
  } catch (err) {
    result = { error: err.message };
  }

  return result;
}

export async function deleteRepo(repositoryId: string): Promise<Message> {
  let command = `rm -r ${repositoryId}`;

  if (userOs === 'Windows_NT') command = `RMDIR /s/q ${repositoryId}`;

  try {
    await gitHelper.deleteFile(command);
  }
  catch(err) {
    return { err: err };     
  }

  return { message: `${repositoryId} was successfully deleted from repos list!` }
}

export async function cloneRepository(url: string, repositoryId: string, dirName: string): Promise<Message> {
  try {
    await gitHelper.cloneRepo(url, repositoryId, dirName);
  }
  catch(err) {
    return { err: err };     
  }

  return { message: `${repositoryId} was succesfully added to api repos list!` };
}
