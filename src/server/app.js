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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var util_1 = require("util");
var checkAccess = util_1.promisify(fs.access);
var dirName = process.argv[2];
var contentHandlers_1 = require("./contentHandlers");
var repositoryId;
var repositoryPath;
var hash = 'master';
var app = express_1["default"]();
app.use(express_1["default"].json());
app.set('json spaces', 4);
app.param('repositoryId', function (req, res, next) {
    repositoryId = req.params.repositoryId;
    if (repositoryId)
        repositoryPath = path.join(dirName, repositoryId);
    next();
});
app.param('commitHash', function (req, res, next) {
    hash = req.params.commitHash;
    next();
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use('/api/repos/:repositoryId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, checkAccess(repositoryPath)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                sendError404(res, 'Repository', repositoryId);
                return [2 /*return*/];
            case 3:
                next();
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/repos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).json;
                return [4 /*yield*/, contentHandlers_1.showRepos(dirName)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get('(/api/repos/:repositoryId/commits/:commitHash)(/diff)?', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!/diff$/.test(req.path)) return [3 /*break*/, 2];
                _b = (_a = res).json;
                return [4 /*yield*/, contentHandlers_1.showDiff(repositoryPath, hash)];
            case 1:
                _b.apply(_a, [_e.sent()]);
                return [3 /*break*/, 4];
            case 2:
                _d = (_c = res).json;
                return [4 /*yield*/, contentHandlers_1.showCommits(repositoryPath, hash, req.query.showFrom, req.query.showMax)];
            case 3:
                _d.apply(_c, [_e.sent()]);
                _e.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('(/api/repos/:repositoryId)((/tree/:commitHash)(/)*)?', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var endpoint, query, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                endpoint = repositoryPath;
                if (req.params[4]) {
                    query = req.params[4];
                    endpoint = path.join(endpoint, query);
                }
                _b = (_a = res).json;
                return [4 /*yield*/, contentHandlers_1.showFilesInfo(endpoint, hash)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get('(/api/repos/:repositoryId/blob/:commitHash)(/)*', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                fileName = req.params[2];
                _a = {
                    fileName: fileName
                };
                return [4 /*yield*/, contentHandlers_1.showFileContent(repositoryPath, hash, fileName)];
            case 1:
                result = (_a.fileContent = _b.sent(),
                    _a);
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app["delete"]('/api/repos/:repositoryId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contentHandlers_1.deleteRepo(repositoryId)];
            case 1:
                result = _a.sent();
                if (result.err) {
                    sendError500(res, result.err);
                }
                res.send(result.message);
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/repos/:repositoryId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contentHandlers_1.cloneRepository(req.body.url, repositoryId, dirName)];
            case 1:
                result = _a.sent();
                if (result.err) {
                    sendError500(res, result.err);
                }
                res.send(result.message);
                return [2 /*return*/];
        }
    });
}); });
function sendError500(res, err) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.send({ error: err });
}
function sendError404(res, paramType, paramValue) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.send({ error: paramType + " " + paramValue + " does not exist." });
}
app.listen(8080);
module.exports = app;
