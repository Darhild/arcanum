const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { formatCodeForReposList, formatCodeForCommitsContent, formatCodeForFileContent, formatCodeForFileTable } = require('./formatters');
const { gitHelper } = require('./gitHandlers');
const { promisify } = require('util');
const checkAccess = promisify(fs.access);
const dirName = process.argv[2];
const userOs = os.type();
let repositoryId; let repositoryPath; 
let hash = 'master';

const app = express();
app.use(express.json());
app.set('json spaces', 4);

app.param('repositoryId', (req, res, next) => {
  repositoryId = req.params.repositoryId;
  if (repositoryId) repositoryPath = path.join(dirName, repositoryId);
  next();
});

app.param('commitHash', (req, res, next) => {
  hash = req.params.commitHash;
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");  
  next();
});

app.use('/api/repos/:repositoryId', async (req, res, next) => { 
  try {
    await checkAccess(repositoryPath)   
  }
  catch(err) {
    sendError404(res, 'Repository', repositoryId);
    return;
  }

  next();
}) 

app.get('/api/repos', async (req, res) => {
  res.json(await showRepos());
});

app.get('(/api/repos/:repositoryId/commits/:commitHash)(/diff)?', async (req, res) => {
  if (/diff$/.test(req.path)) {
    res.json(await showDiff());
  }
  else {
    res.json(await showCommits(req.params.showFrom, req.params.showMax));  
  }
});

app.get('(/api/repos/:repositoryId)((/tree/:commitHash)(/)*)?', async (req, res) => {
  let endpoint = repositoryPath;
  if (req.params[4]) { 
    const query = req.params[4];
    endpoint = path.join(endpoint, query);
  }

  res.json(await showFilesInfo(endpoint));
});

app.get('(/api/repos/:repositoryId/blob/:commitHash)(/)*', async (req, res) => {
  const fileName = req.params[2];  
  let result = {
    fileName: fileName,
    fileContent: await showFileContent(fileName)
  };  

  res.json(result);
});

app.delete('/api/repos/:repositoryId', deleteRepo);

app.post('/api/repos/:repositoryId', cloneRepository);

async function showRepos() {
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

async function showDiff() {
  let result;

  try {
    let diff = await gitHelper.getCommitDiff(repositoryPath, hash);
    console.log(diff);
    result = formatCodeForFileTable(diff.stdout);
  }
  catch (err) {
    result = {err: err.message};    
  }

  return result;
}

async function getPaginatedCommitsInfo(showFrom, showMax) {
  let numberOfCommits;
  let str = "";

  try {        
    let count = await gitHelper.getCommitsNumber(repositoryPath, hash);
    numberOfCommits = +count.stdout;
  }
  catch(err) {
    numberOfCommits = 0;
  }      

  if (showFrom) {
    if (showFrom < numberOfCommits) str += ` --skip=${showFrom - 1}`;
  }

  if (showMax) {
    if (showMax > 0 && showMax <= numberOfCommits) {
      str += ` -n ${showMax}`;
    }
  }

  return str;
}

async function showCommits(showFrom, showMax) {
  let paginatedCommits = "";

  if (showFrom || showMax) {
    paginatedCommits = await getPaginatedCommitsInfo(showFrom, showMax)
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

async function showFilesInfo(endpoint) {
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

async function showFileContent(fileName) { 
  let data, result; 

  try {
    data = await gitHelper.getBlob(repositoryPath, hash, fileName);
    result = formatCodeForFileContent(data.stdout);
  } catch (err) {
    result = { error: err.message };
  }

  return result;
}

async function deleteRepo(req, res) {
  let command = `rm -r ${repositoryId}`;

  if (userOs === 'Windows_NT') command = `RMDIR /s/q ${repositoryId}`;

  try {
    await gitHelper.deleteFile(command);
  }
  catch(err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.send({ error: err });    
  }

  res.send({ message: `${req.params.repositoryId} was successfully deleted from repos list!` });

}

async function cloneRepository(req, res) {
  try {
    await gitHelper.cloneRepo(req.body.url, repositoryId, dirName);
  }
  catch(err) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.send({ error: err });
  }

  res.send({ message: `${repositoryId} was succesfully added to api repos list!` });
}

function sendError404(res, paramType, paramValue) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.send({ error: `${paramType} ${paramValue} does not exist.` });
}

app.listen(8080);

module.exports = {
  app: app,
  showRepos: showRepos,
  showDiff: showDiff,
  getPaginatedCommitsInfo: getPaginatedCommitsInfo,
  showCommits: showCommits,
  showFilesInfo: showFilesInfo,
  showFileContent: showFileContent,
  deleteRepo: deleteRepo,
  cloneRepository: cloneRepository
}