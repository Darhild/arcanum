"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var path = __importStar(require("path"));
var os = __importStar(require("os"));
var userOs = os.type();
var gitHelper_1 = require("./gitHelper");
var formatters_1 = require("./formatters");
var gitHelper = new gitHelper_1.GitHelper;
function showRepos(dirName) {
    return __awaiter(this, void 0, void 0, function () {
        var result, repos, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, gitHelper.readdir(dirName)];
                case 1:
                    repos = _a.sent();
                    result = formatters_1.formatCodeForReposList(repos);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    result = { error: err_1.message };
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
exports.showRepos = showRepos;
function showDiff(repositoryPath, hash) {
    return __awaiter(this, void 0, void 0, function () {
        var result, diff, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, gitHelper.getCommitDiff(repositoryPath, hash)];
                case 1:
                    diff = _a.sent();
                    result = formatters_1.formatCodeForFileTable(diff.stdout);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    result = { err: err_2.message };
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
exports.showDiff = showDiff;
function getPaginatedCommitsInfo(repositoryPath, hash, showFrom, showMax) {
    return __awaiter(this, void 0, void 0, function () {
        var numberOfCommits, str, count, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    str = "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gitHelper.getCommitsNumber(repositoryPath, hash)];
                case 2:
                    count = _a.sent();
                    numberOfCommits = +count.stdout;
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, str];
                case 4:
                    if (showFrom) {
                        if (showFrom < numberOfCommits)
                            str += " --skip=" + (showFrom - 1);
                    }
                    if (showMax) {
                        if (showMax > 0 && showMax <= numberOfCommits)
                            str += " -n " + showMax;
                    }
                    return [2 /*return*/, str];
            }
        });
    });
}
exports.getPaginatedCommitsInfo = getPaginatedCommitsInfo;
function showCommits(repositoryPath, hash, showFrom, showMax) {
    return __awaiter(this, void 0, void 0, function () {
        var paginatedCommits, result, commits, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paginatedCommits = "";
                    if (!(showFrom || showMax)) return [3 /*break*/, 2];
                    return [4 /*yield*/, getPaginatedCommitsInfo(repositoryPath, hash, showFrom, showMax)];
                case 1:
                    paginatedCommits = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, gitHelper.getCommits(repositoryPath, hash, paginatedCommits)];
                case 3:
                    commits = _a.sent();
                    result = formatters_1.formatCodeForCommitsContent(commits.stdout);
                    return [3 /*break*/, 5];
                case 4:
                    err_4 = _a.sent();
                    result = { error: err_4.message };
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, result];
            }
        });
    });
}
exports.showCommits = showCommits;
function showFilesInfo(endpoint, hash) {
    return __awaiter(this, void 0, void 0, function () {
        var files, err_5, result, responses, err_6;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, gitHelper.readdir(endpoint)];
                case 1:
                    files = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    return [2 /*return*/, ({ error: err_5.message })];
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var type, info;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        type = 'folder';
                                        if (path.extname(file))
                                            type = 'file';
                                        return [4 /*yield*/, gitHelper.getGitInfoAboutFile(endpoint, hash, file)];
                                    case 1:
                                        info = _a.sent();
                                        return [2 /*return*/, "name - " + file + ", type - " + type + ", " + info.stdout];
                                }
                            });
                        }); }))];
                case 4:
                    responses = _a.sent();
                    result = responses.map(function (response) { return formatters_1.formatCodeForFileTable(response); });
                    return [3 /*break*/, 6];
                case 5:
                    err_6 = _a.sent();
                    result = { error: err_6.message };
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, result];
            }
        });
    });
}
exports.showFilesInfo = showFilesInfo;
function showFileContent(repositoryPath, hash, fileName) {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, gitHelper.getBlob(repositoryPath, hash, fileName)];
                case 1:
                    data = _a.sent();
                    result = formatters_1.formatCodeForFileContent(data.stdout);
                    return [3 /*break*/, 3];
                case 2:
                    err_7 = _a.sent();
                    result = { error: err_7.message };
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
exports.showFileContent = showFileContent;
function deleteRepo(repositoryId) {
    return __awaiter(this, void 0, void 0, function () {
        var command, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    command = "rm -r " + repositoryId;
                    if (userOs === 'Windows_NT')
                        command = "RMDIR /s/q " + repositoryId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gitHelper.deleteFile(command)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_8 = _a.sent();
                    return [2 /*return*/, { err: err_8 }];
                case 4: return [2 /*return*/, { message: repositoryId + " was successfully deleted from repos list!" }];
            }
        });
    });
}
exports.deleteRepo = deleteRepo;
function cloneRepository(url, repositoryId, dirName) {
    return __awaiter(this, void 0, void 0, function () {
        var err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, gitHelper.cloneRepo(url, repositoryId, dirName)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_9 = _a.sent();
                    return [2 /*return*/, { err: err_9 }];
                case 3: return [2 /*return*/, { message: repositoryId + " was succesfully added to api repos list!" }];
            }
        });
    });
}
exports.cloneRepository = cloneRepository;
