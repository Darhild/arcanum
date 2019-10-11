
const path = require('path');
const { gitHelper } = require('./gitHelper');
const { formatCodeForReposList, formatCodeForCommitsContent, formatCodeForFileContent, formatCodeForFileTable } = require('./formatters');

async function showRepos(dirName) {
  let result;

  try {
    let repos = await gitHelper.readdir(dirName);
    result = formatCodeForReposList(repos);  
  } 
  catch (err) {
    result = { error: err.message };    
  }

  return result;
}

async function showDiff(repositoryPath, hash) {
  let result;

  try {
    let diff = await gitHelper.getCommitDiff(repositoryPath, hash);
    result = formatCodeForFileTable(diff.stdout);
  }
  catch (err) {
    result = {err: err.message};    
  }

  return result;
}

async function getPaginatedCommitsInfo(repositoryPath, hash, showFrom, showMax) {
  let numberOfCommits;
  let str = ""; 

  try {        
    let count = await gitHelper.getCommitsNumber(repositoryPath, hash);    
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

async function showCommits(repositoryPath, hash, showFrom, showMax) {
  let paginatedCommits = "";

  if (showFrom || showMax) {
    paginatedCommits = await getPaginatedCommitsInfo(repositoryPath, hash, showFrom, showMax);
  }

  let result; 

  try {
    const commits = await gitHelper.getCommits(repositoryPath, hash, paginatedCommits);
    result = formatCodeForCommitsContent(commits.stdout);
  }
  catch(err) {
    result = { error: err.message }
  }   

  return result;
}

async function showFilesInfo(endpoint, hash) {
  let files;  

  try {
    files = await gitHelper.readdir(endpoint);
  } catch (err) {
    return({ error: err.message });
  }  

  let result;

  try {
    const responses = await Promise.all(files.map(async(file) => { 
      let type = 'folder';
      if (path.extname(file)) type = 'file';
      let data = [`name - ${file}, type - ${type},`];  
      const info = await gitHelper.getGitInfoAboutFile(endpoint, hash, file); 
      data.push(info.stdout);
      return data.join(' ');
    }));

    result = responses.map(response => formatCodeForFileTable(response))
  }
  catch(err) {
    result = {error: err.message}
  } 

  return result;
}

async function showFileContent(repositoryPath, hash, fileName) { 
  let data, result; 

  try {
    data = await gitHelper.getBlob(repositoryPath, hash, fileName);
    result = formatCodeForFileContent(data.stdout);
  } catch (err) {
    result = { error: err.message };
  }

  return result;
}

module.exports = {
  showRepos: showRepos,
  showDiff: showDiff,
  getPaginatedCommitsInfo: getPaginatedCommitsInfo,
  showCommits: showCommits,
  showFilesInfo: showFilesInfo,
  showFileContent: showFileContent
}