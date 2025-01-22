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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const client_1 = require("@seven.io/client");
const node_assert_1 = require("node:assert");
const optionalParams = {
    delay: undefined,
    foreign_id: undefined,
    from: undefined,
    label: undefined,
    ttl: undefined,
    udh: undefined,
};
const send = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = Object.assign(Object.assign({}, optionalParams), { text: (0, core_1.getInput)('text', { required: true }), to: (0, core_1.getInput)('to', { required: true }).split(',') });
    Object.keys(optionalParams)
        .forEach(k => params[k] = (0, core_1.getInput)(k));
    (0, core_1.debug)('Sending SMS');
    try {
        const apiKey = (0, core_1.getInput)('apiKey') || process.env.SEVEN_API_KEY;
        (0, node_assert_1.ok)(apiKey);
        const client = new client_1.Client({ apiKey, sentWith: 'github-action-sms' });
        const response = yield new client_1.SmsResource(client).dispatch(params);
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
