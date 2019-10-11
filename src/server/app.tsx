import express from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
const checkAccess = promisify(fs.access);
const dirName = process.argv[2];
import { Message, showRepos, showDiff, showCommits, showFilesInfo, showFileContent, deleteRepo, cloneRepository } from './contentHandlers';
import { Response } from 'express-serve-static-core';

let repositoryId: string; let repositoryPath: string; 
let hash: string = 'master';

const app: express.Application = express();
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
  let endpoint: string = repositoryPath;
  if (req.params[4]) { 
    const query: string = req.params[4];
    endpoint = path.join(endpoint, query);
  }

  res.json(await showFilesInfo(endpoint, hash));
});

app.get('(/api/repos/:repositoryId/blob/:commitHash)(/)*', async (req, res) => {
  const fileName: string = req.params[2];  
  let result: object = {
    fileName: fileName,
    fileContent: await showFileContent(repositoryPath, hash, fileName)
  };  

  res.json(result);
});

app.delete('/api/repos/:repositoryId', async (req, res) => {
  const result: Message = await deleteRepo(repositoryId);

  if (result.err) {
    sendError500(res, result.err) 
  }  

  res.send(result.message)
});

app.post('/api/repos/:repositoryId', async (req, res) => {
  const result: Message = await cloneRepository(req.body.url, repositoryId, dirName);

  if (result.err) {
    sendError500(res, result.err)
  }  

  res.send(result.message)
});

function sendError500(res: Response, err: string): void {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.send({ error: err });
}

function sendError404(res: Response, paramType: string, paramValue: string): void {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.send({ error: `${paramType} ${paramValue} does not exist.` });
}

app.listen(8080);

module.exports = app;