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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const api_1 = __importDefault(require("@seven.io/api"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_assert_1 = require("node:assert");
global.fetch = node_fetch_1.default;
const smsParams = {
    delay: undefined,
    foreign_id: undefined,
    from: undefined,
    label: undefined,
    text: '',
    to: '',
    ttl: undefined,
    udh: undefined,
};
const send = () => __awaiter(void 0, void 0, void 0, function* () {
    Object.keys(smsParams)
        .forEach(k => smsParams[k] = (0, core_1.getInput)(k));
    (0, core_1.debug)('Sending SMS');
    try {
        const apiKey = (0, core_1.getInput)('apiKey') || process.env.SEVEN_API_KEY;
        (0, node_assert_1.ok)(apiKey);
        const response = yield (new api_1.default(apiKey, 'github-action-sms'))
            .sms(smsParams);
        (0, core_1.debug)('API reached, SMS dispatch ended.');
        (0, core_1.setOutput)('API response', response);
        return response;
    }
    catch (e) {
        const message = e.message;
        (0, core_1.error)(message);
        (0, core_1.setFailed)(message);
    }
});
exports.default = send;
send();
