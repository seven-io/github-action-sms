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
const sms77_client_1 = __importDefault(require("sms77-client"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const assert_1 = require("assert");
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
        .forEach(k => smsParams[k] = core_1.getInput(k));
    core_1.debug('Sending SMS');
    try {
        const apiKey = core_1.getInput('apiKey') || process.env.SMS77_API_KEY;
        assert_1.ok(apiKey);
        const response = yield (new sms77_client_1.default(apiKey, 'github-action-sms'))
            .sms(smsParams);
        core_1.debug('API reached, SMS dispatch ended.');
        core_1.setOutput('API response', response);
        return response;
    }
    catch (e) {
        core_1.error(e.message);
        core_1.setFailed(e.message);
    }
});
exports.default = send;
send();
