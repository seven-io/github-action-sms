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
const getKeyByType = (key, options) => (0, core_1.getInput)(key, options);
const parseBool = (value) => value === '1' || value === 'true';
function send() {
    return __awaiter(this, void 0, void 0, function* () {
        const smsParams = {
            text: getKeyByType('text', { required: true }),
            to: getKeyByType('to', { required: true }),
        };
        const delay = getKeyByType('delay');
        if (delay)
            smsParams.delay = delay;
        const foreignId = getKeyByType('foreign_id');
        if (foreignId)
            smsParams.foreign_id = foreignId;
        const from = getKeyByType('from');
        if (from)
            smsParams.from = from;
        const json = parseBool(getKeyByType('json'));
        if (json)
            smsParams.json = json;
        const label = getKeyByType('label');
        if (label)
            smsParams.label = label;
        const ttl = Number.parseInt(getKeyByType('ttl'));
        if (!Number.isNaN(ttl))
            smsParams.ttl = ttl;
        const udh = getKeyByType('udh');
        if (udh)
            smsParams.udh = udh;
        (0, core_1.debug)('Sending SMS');
        try {
            const apiKey = (0, core_1.getInput)('apiKey') || process.env.SMS77_API_KEY;
            (0, assert_1.ok)(apiKey);
            const client = new sms77_client_1.default(apiKey, 'github-action-sms');
            const response = yield client.sms(smsParams);
            (0, core_1.debug)('API reached, SMS dispatch ended.');
            (0, core_1.setOutput)('API response', response);
            return response;
        }
        catch (e) {
            (0, core_1.error)(e.message);
            (0, core_1.setFailed)(e.message);
        }
    });
}
exports.default = send;
;
send();
