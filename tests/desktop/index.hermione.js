const assert = require('assert');

describe('Редирект', () => {
  it('должен происходить из главной страницы на страницу /api/repos', function() {
    return this.browser
      .url('/')
      .getUrl('/api/repos')
      .then(() => {
        assert(this.browser.getUrl(), '/api/repos');
      })
  })
})

describe('Навигация', () => {
  it('должен переходить на страницу директорий после клика на имя директории', function() {
    return this.browser
      .url('/api/repos/')      
      .then(() => {        
        this.browser.$('.FileName .FileContent-Name').click()
      })
      .getUrl()
      .then(url => {
        const text = this.browser.$('.FileName .FileContent-Name').getText();
        assert(url, `api/repos/${text}`)        
      })
  })

  it('должен переходить на страницу файла после клика на имя файла', function() {
    return this.browser
      .url('/api/repos/task-3')      
      .then(() => {        
        this.browser.$('.FileName .FileContent-Name').click()
      })
      .getUrl()
      .then(url => {
        const text = this.browser.$('.FileName .FileContent-Name').getText();
        assert(url, `api/repos/${text}`)        
      })
  })
})

describe('Список корневых директорий', () => {
  it('должен появиться на странице', function() {
    return this.browser
      .url('/api/repos')
      .waitUntil(() => {
        return this.browser.isExisting('.Folders')  
      }) 
      .then((exists) => {
        assert.ok(exists, 'Содержимое файла не появилось')
      })    
      .assertView('folders', '.Folders')
  })
})

describe('Список файлов', () => {
  it('должен появиться на странице', function() {
    return this.browser
      .url('/api/repos/task-3')
      .waitUntil(() => {
        return this.browser.isExisting('.ContentTable')  
      })      
      .then((exists) => {
        assert.ok(exists, 'Список файлов не появился')
      })
      .assertView('files-content', '.ContentTable')
  })
})

describe('Содержимое файла', () => {
  it('должно появиться на странице', function() {
    return this.browser
      .url('/api/repos/yeticave/blob/master/error.php')
      .waitUntil(() => {
        return this.browser.isExisting('.FileContent')  
      }) 
      .then((exists) => {
        assert.ok(exists, 'Содержимое файла не появилось')
      })
      .assertView('file-content', '.FileContent')
  })

  it('Название файла должно отображаться корректно', function() {
    return this.browser
      .url('/api/repos/yeticave/blob/master/error.php')
      .waitUntil(() => {
        return this.browser.isExisting('.FileContent')  
      }) 
      .then(() => {
        const filename = this.browser.$('.FileContent-Head .FileContent-Name');
        assert(filename, 'error.php');        
      })
  })
})