const { formatCodeForReposList, formatCodeForCommitsContent, formatCodeForFileContent, formatCodeForFileTable } = require('./../../server/formatters');
const chai = require('chai');
const assert = chai.assert;

describe('formatting', () => {
  describe('formatCodeForReposList', () => {
    it('should format arr and return array of objects', () => {
      const arr = [ 'dir1', 'dir2', 'dir3'];

      const result = formatCodeForReposList(arr);

      const expected = [
        {
          name: "dir1",
          type: "folder"
        },
        {
          name: "dir2",
          type: "folder"
        },
        {
          name: "dir3",
          type: "folder"
        }       
      ] 
           
      compareArrays(result, expected);
    })

  })

  describe('formatCodeForCommitsContent', () => {
    it('should format string and return array of objects', () => {
      const string = "aaabbbb Tue Sep 10 11:00:00 2019 +0300\ncccdddd Tue Oct 08 08:00:00 2019 +0300\n";

      const result = formatCodeForCommitsContent(string);

      const expected =  [
        {
          aaabbbb: "Tue Sep 10 11:00:00 2019 +0300"
        },
        {
          cccdddd: "Tue Oct 08 08:00:00 2019 +0300"
        }
      ];
           
      compareArrays(result, expected);
    })
  })  

  describe('formatCodeForFileTable', () => {
    it('should format string and return array of objects', () => {
      const string = "name - 1, type - folder, lastCommit - 888777, message - message1, committer - a, commitDate - 5 weeks ago\nname - 2.php, type - file, lastCommit - 888777, message - message2, committer - b, commitDate - 3 weeks ago";

      const result = formatCodeForFileTable(string);

      const expected = [
        { name: '1',
          type: 'folder',
          lastCommit: '888777',
          message: 'message1',
          committer: 'a',
          commitDate: '5 weeks ago' 
        },
        { name: '2.php',
          type: 'file',
          lastCommit: '888777',
          message: 'message2',
          committer: 'b',
          commitDate: '3 weeks ago' 
        }    
      ]         
          
      compareArrays(result, expected);
    })
  })
    
  describe('formatCodeForFileContent', () => {
    it('should format string and return with array of objects', () => {
      const string = "a\nb\nc\n";

      const result = formatCodeForFileContent(string);

      const expected = [      
            {
                "id": 1,
                "str": "a"
            },
            {
                "id": 2,
                "str": "b"
            },
            {
                "id": 3,
                "str": "c"
            }
        ]
          
      compareArrays(result, expected);
    })
  })  
})

function compareArrays(result, expected) {
  for(let i=0; i < result.length; i++) {
    assert.deepEqual(result[i], expected[i]);
  }
}

