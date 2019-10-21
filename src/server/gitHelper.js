"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var child_process_1 = require("child_process");
var util_1 = require("util");
var fsReadDir = util_1.promisify(fs.readdir);
var asyncExec = util_1.promisify(child_process_1.exec);
var GitHelper = /** @class */ (function () {
    function GitHelper() {
    }
    GitHelper.prototype.readdir = function (name) {
        return fsReadDir(name);
    };
    GitHelper.prototype.getCommitsNumber = function (path, hash) {
        return asyncExec("git rev-list --count " + hash, { cwd: path });
    };
    GitHelper.prototype.getCommitDiff = function (path, hash) {
        return asyncExec("git diff " + hash + " " + hash + "^~1", { cwd: path });
    };
    GitHelper.prototype.getCommits = function (path, hash, paginatedCommits) {
        return asyncExec("git log " + hash + " --pretty=format:\"%h %ad\" " + paginatedCommits, { cwd: path });
    };
    GitHelper.prototype.getGitInfoAboutFile = function (path, hash, name) {
        return asyncExec("git log " + hash + " --pretty=format:\" lastCommit - %h, message - %s, committer - %an, commitDate - %cr\" -1 " + name, { cwd: path });
    };
    GitHelper.prototype.getBlob = function (path, hash, fileName) {
        return asyncExec("git show " + hash + ":" + fileName, { cwd: path });
    };
    GitHelper.prototype.deleteFile = function (command) {
        return asyncExec("" + command);
    };
    GitHelper.prototype.cloneRepo = function (url, repositoryId, dir) {
        return asyncExec("git clone " + url + " " + repositoryId, { cwd: dir });
    };
    return GitHelper;
}());
exports.GitHelper = GitHelper;
