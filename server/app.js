const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec, execSync, fork } = require('child_process');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const checkAccess = promisify(fs.access);
const dirName = process.argv[2];
const userOs = os.type();
let repositoryId; let repositoryPath; let hash;

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
  await checkAccess(repositoryPath)    
    .catch(() => sendError404(res, 'Repository', repositoryId));

  next();
}) 

app.get('/api/repos', async (req, res) => {
  let repos;
  try {
    repos = await readdir(dirName);
  } catch (err) {
    repos = { error: err.message };
  }

  let data = [];
  
  repos.forEach(repo => {
    data.push({
      name: repo,
      type: 'folder'
    })     
  })  

  res.json(data);
});

app.get('(/api/repos/:repositoryId/commits/:commitHash)(/diff)?', async (req, res) => {
  if (/diff$/.test(req.path)) {
    exec(`git diff ${hash} ${hash}^~1`, { cwd: repositoryPath }, (err, out) => {
      if (err) {
        out = err.message;
      }

      res.send(out);
    });
  }

  else {
    let paginatedCommits = '';

    if (req.query.showFrom || req.query.showMax) {
      const numberOfCommits = execSync(`git rev-list --count ${hash}`).toString();
      console.log(numberOfCommits);

      if (req.query.showFrom) {
        if (req.query.showFrom < numberOfCommits) paginatedCommits += ` --skip=${req.query.showFrom}`;
      }

      if (req.query.showMax) {
        if (req.query.showMax > 0 && req.query.showMax <= numberOfCommits) {
          paginatedCommits += ` -n ${req.query.showMax}`;
        }
      }
    }

    exec(`git log ${hash} --pretty=format:"%h %ad" ${paginatedCommits}`, { cwd: repositoryPath }, (err, out) => {
      if (err) {
        out = { error: err.message };
      }

      const arr = out.split('\n');
      out = arr.map((commit) => {
        const obj = {};
        const key = commit.slice(0, 7);
        const value = commit.slice(8);
        obj[key] = value;
        return obj;
      });

      res.json(out);
    });
  }
});

app.get('(/api/repos/:repositoryId)((/tree/:commitHash)(/)*)?', async (req, res) => {
  let files;
  let endpoint = repositoryPath;
  //console.log(req.params);
  if (req.params[4]) { 
    const query = req.params[4];
    //console.log(query);
    endpoint = path.join(endpoint, query);
    console.log(endpoint);
  }
  
  let branch = 'master';
  try {
    files = await readdir(endpoint);
  } catch (err) {
    res.send({ error: err.message });
  }
  
  if (hash) branch = hash;

  Promise.all(files.map((file) => {     
    return new Promise((resolve, reject) => {
      let type = 'folder';
      if (path.extname(file)) type = 'file';
      const data = [`name - ${file}, type - ${type},`];   
      exec(`git log --pretty=format:" lastCommit - %h, message - %s, committer - %an, commitDate - %cr" -1 ${file}`, { cwd: endpoint }, (err, out) => {
        if(err) reject(err);
        data.push(out);
        resolve(data.toString());
      });      
    })
  }))
    .then((responses) => {
      let data = [];
      responses.forEach((response) => {
        data.push(formatCodeForFileTable(response));
        })
      return data;
    })
    .then(result => res.json(result))
    .catch(err => res.json({error: err.message}))
});

/*
app.get('(/api/repos/:repositoryId)(/tree/:commitHash)?(/:path)?', (req, res) => {
  let endpoint = repositoryPath;
  let branch = 'master';

  if (innerPath) endpoint = path.join(repositoryPath, innerPath);
  if (hash) branch = hash;

  exec(`git ls-tree --name-only ${branch}`, { cwd: endpoint }, (err, out) => {
    res.json(formatCode(out));
  });

});
*/

app.get('(/api/repos/:repositoryId/blob/:commitHash)(/)*', async (req, res) => {
  const fileName = req.params[2];  
  let data;  
  let result = {
    fileName: fileName,
    fileContent: []
  };  

  try {
    data = await new Promise((resolve, reject) => {
      exec(`git show ${hash}:${fileName}`, { cwd: repositoryPath }, (err, out) => {
        resolve(out);
      })
    })     
  } catch (err) {
    res.json({ error: err.message });
  }

  result.fileContent = formatCodeForFileContent(data);

  res.json(result);
});

app.get('/api/repos/:repositoryId/count/:commitHash', (req, res) => {
  if (hash) {
    exec(`git checkout ${hash}`, (err, out) => {
      if (err) {
        res.send({ git_error: err });
      }
    });
  }

  const childProcess = fork(`${__dirname}/countSymbols.js`, [repositoryPath]);
  childProcess.on('message', (data) => res.send(data));

});

app.delete('/api/repos/:repositoryId', (req, res) => {
  let command = `rm -r ${repositoryId}`;

  if (userOs === 'Windows_NT') command = `RMDIR /s/q ${repositoryId}`;

  exec(command, (err, out) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.send({ error: err });
    }

    res.send({ message: `${req.params.repositoryId} was successfully deleted from repos list!` });
  });

});

app.post('/api/repos/:repositoryId', (req, res) => {
  const repo = req.body.url;

  exec(`git clone ${repo} ${req.params.repositoryId}`, { cwd: dirName }, (err, out) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 500;
      res.send({ error: err });
    }

    res.send({ message: `${req.params.repositoryId} was succesfully added to api repos list!` });
  });
});

function formatCode(string) {
  return string.trim().split('\n');
}

function formatCodeForFileContent(string) {
  const arr = string.trim().split('\n');
  const result = [];    

  for(let i = 1; i <= arr.length; i++) {
    const obj = {};
    obj.id = i;
    obj.str = arr[i];
    result.push(obj)
  }

  return result;
}

function formatCodeForFileTable(string) {
  const arr = string.trim().split(',');
  const obj = {};

  arr.forEach((info) => {    
    const idx = info.indexOf('-');
    const key = info.slice(0, idx).trim();
    const value = info.slice(idx + 1).trim();
    obj[key] = value;
  });

  return obj;
}

function sendError404(res, paramType, paramValue) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.send({ error: `${paramType} ${paramValue} does not exist.` });
}

app.listen(8000);

module.exports = app;