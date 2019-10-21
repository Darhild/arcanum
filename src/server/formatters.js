"use strict";
exports.__esModule = true;
function formatCodeForReposList(arr) {
    return arr.map(function (repo) {
        return {
            name: repo,
            type: 'folder'
        };
    });
}
exports.formatCodeForReposList = formatCodeForReposList;
function formatCodeForCommitsContent(string) {
    var arr = string.trim().split('\n');
    var result = arr.map(function (commit) {
        var obj = {};
        var key = commit.slice(0, 7);
        var value = commit.slice(8);
        obj[key] = value;
        return obj;
    });
    return result;
}
exports.formatCodeForCommitsContent = formatCodeForCommitsContent;
function formatCodeForFileTable(string) {
    var arr = string.trim().split(',');
    var obj = {};
    arr.forEach(function (info) {
        var idx = info.indexOf('-');
        var key = info.slice(0, idx).trim();
        var value = info.slice(idx + 1).trim();
        obj[key] = value;
    });
    return obj;
}
exports.formatCodeForFileTable = formatCodeForFileTable;
function formatCodeForFileContent(string) {
    var arr = string.trim().split('\n');
    var result = [];
    for (var i = 1; i <= arr.length; i++) {
        var obj = {
            id: null,
            str: null
        };
        obj.id = i;
        obj.str = arr[i - 1];
        result.push(obj);
    }
    return result;
}
exports.formatCodeForFileContent = formatCodeForFileContent;
