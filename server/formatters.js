
function formatCodeForReposList(arr) {
  return arr.map(repo => {
    return {
      name: repo,
      type: 'folder'
    }        
  })  
}

function formatCodeForCommitsContent(string) {
  const arr = string.trim().split('\n');

  const result = arr.map((commit) => {
    const obj = {};
    const key = commit.slice(0, 7);
    const value = commit.slice(8);
    obj[key] = value;
    return obj;
  });

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

function formatCodeForFileContent(string) {
  const arr = string.trim().split('\n');
  const result = [];    

  for(let i = 1; i <= arr.length; i++) {
    const obj = {};
    obj.id = i;
    obj.str = arr[i - 1];
    result.push(obj)
  }

  return result;
}

module.exports = {
  formatCodeForReposList: formatCodeForReposList,
  formatCodeForCommitsContent: formatCodeForCommitsContent,
  formatCodeForFileContent: formatCodeForFileContent,
  formatCodeForFileTable: formatCodeForFileTable
}