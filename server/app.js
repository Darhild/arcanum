const express = require('express');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const checkAccess = promisify(fs.access);
const dirName = process.argv[2];
const os = require('os');
const userOs = os.type();
const { showRepos, showDiff, showCommits, showFilesInfo, showFileContent } = require('./contentHandlers');
const { gitHelper } = require('./gitHelper');

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
  res.json(await showRepos(dirName));
});

app.get('(/api/repos/:repositoryId/commits/:commitHash)(/diff)?', async (req, res) => {
  if (/diff$/.test(req.path)) {
    res.json(await showDiff(repositoryPath, hash));
  }
  else {
    res.json(await showCommits(repositoryPath, hash, req.query.showFrom, req.query.showMax));  
  }
});

app.get('(/api/repos/:repositoryId)((/tree/:commitHash)(/)*)?', async (req, res) => {
  let endpoint = repositoryPath;
  if (req.params[4]) { 
    const query = req.params[4];
    endpoint = path.join(endpoint, query);
  }

  res.json(await showFilesInfo(endpoint, hash));
});

app.get('(/api/repos/:repositoryId/blob/:commitHash)(/)*', async (req, res) => {
  const fileName = req.params[2];  
  let result = {
    fileName: fileName,
    fileContent: await showFileContent(repositoryPath, hash, fileName)
  };  

  res.json(result);
});

app.delete('/api/repos/:repositoryId', deleteRepo);

app.post('/api/repos/:repositoryId', cloneRepository);

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

module.exports = app;