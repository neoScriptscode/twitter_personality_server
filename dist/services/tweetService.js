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
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyize = exports.getTweets = void 0;
var twitter_1 = __importDefault(require("twitter"));
var v3_1 = __importDefault(require("ibm-watson/personality-insights/v3"));
var auth_1 = require("ibm-watson/auth");
var keys_1 = require("../config/keys");
var T = new twitter_1.default(keys_1.twitterKeys);
var personalityInsights = new v3_1.default({
    authenticator: new auth_1.IamAuthenticator({ apikey: keys_1.watsonKeys.apikey }),
    version: '2017-10-13',
    serviceUrl: keys_1.watsonKeys.url,
});
var getTweets = function (username) { return new Promise(function (resolve, reject) {
    T.get('statuses/user_timeline', { screen_name: username, count: 100 }, function (error, tweets, response) {
        if (error)
            return reject(error);
        if (!tweets)
            return reject(new Error('A Server Error Occured'));
        if (response.statusCode === 404)
            return reject(new Error('Invalid username'));
        var tweetsText = [];
        tweets.map(function (tweet) { return tweetsText.push(tweet.text); });
        return resolve(tweetsText);
    });
}); };
exports.getTweets = getTweets;
var analyize = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var tweets, joinedTweets, Finaldata, data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getTweets(username)];
            case 1:
                tweets = _a.sent();
                joinedTweets = tweets.join();
                Finaldata = [];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, personalityInsights.profile({
                        content: joinedTweets,
                        contentType: 'text/plain',
                        consumptionPreferences: true,
                    })];
            case 3:
                data = _a.sent();
                data.result.personality.map(function (p) { return Finaldata.push({ name: p.name, value: Math.floor(p.percentile * 100) }); });
                data.result.needs.map(function (n) { return Finaldata.push({ name: n.name, value: Math.floor(n.percentile * 100) }); });
                console.log(Finaldata);
                return [2 /*return*/, Finaldata];
            case 4:
                e_1 = _a.sent();
                throw new Error(e_1);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.analyize = analyize;
//# sourceMappingURL=tweetService.js.map