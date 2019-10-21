export interface NumberedStrings {
  id: number;
  str: string
}

export interface CommitInfo {
  name: string;
  type: string;
  lastCommit?: string;
  message?: string;
  committer?: string;
  commitDate?: string;
  [prop: string]: any  
}

export function formatCodeForReposList(arr: Array<string>): Array<object> {
  return arr.map(repo => {
    return {
      name: repo,
      type: 'folder'
    }        
  })  
}

export function formatCodeForCommitsContent(string: string): Array<object> {
  const arr: Array<string> = string.trim().split('\n');

  const result = arr.map((commit) => {
    const obj: any = {};
    const key = commit.slice(0, 7);
    const value: string = commit.slice(8);
    obj[key] = value;
    return obj;
  });

  return result;
}

export function formatCodeForFileTable(string: string): CommitInfo {
  const arr: Array<string> = string.trim().split(',');
  const obj: CommitInfo = {
    name: '',
    type: ''
  };

  arr.forEach((info) => {    
    const idx = info.indexOf('-');
    const key = info.slice(0, idx).trim();
    const value = info.slice(idx + 1).trim();
    obj[key] = value;
  });

  return obj;
}

export function formatCodeForFileContent(string: string): Array<NumberedStrings> {
  const arr: Array<string> = string.trim().split('\n');
  const result = [];    

  for(let i = 1; i <= arr.length; i++) { 
    const obj: NumberedStrings = {
      id: 0,
      str: ''
    }

    obj.id = i;
    obj.str = arr[i - 1];
    result.push(obj)
  }

  return result;
}

