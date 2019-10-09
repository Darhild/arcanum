const assert = require('assert');

describe('Редирект', () => {
  it('должен происходить из главной страницы на страницу /api/repos', function() {
    return this.browser
      .url('/')
      .getUrl('/api/repos')
      .then((redirects) => {
        assert.ok(redirects, 'Редирект на api/repos не происходит')
      })
  })
})

describe('Список корневых директорий', () => {
  it('должен появиться на странице', function() {
    return this.browser
      .url('/api/repos')
      .isExisting('.Folders')
      .assertView('plain', '.Folders')
      .then((exists) => {
        assert.ok(exists, 'Список корневых директорий не появился')
      })
  })
})

describe('Список файлов', () => {
  it('должен появиться на странице', function() {
    return this.browser
      .url('/api/repos/yeticave')
      .isExisting('.FilesContent')
      .assertView('plain', '.FilesContent')
      .then((exists) => {
        assert.ok(exists, 'Список файлов не появился')
      })
  })

  describe('Содержимое файла', () => {
    it('должно появиться на странице', function() {
      return this.browser
        .url('/api/repos/yeticave/blob/master/functions.php')
        .isExisting('.FileContent')
        .assertView('plain', '.FileContent')
        .then((exists) => {
          assert.ok(exists, 'Содержимое файла не появилось')
        })
    })
  })
})