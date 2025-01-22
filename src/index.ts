import {debug, error, getInput, setFailed, setOutput} from '@actions/core';
import {Client, type SmsParams, SmsResource} from '@seven.io/client'
import {ok} from 'node:assert';

const optionalParams: Omit<SmsParams, 'text' | 'to'> = {
    delay: undefined,
    foreign_id: undefined,
    from: undefined,
    label: undefined,
    ttl: undefined,
    udh: undefined,
};

const send = async () => {
    const params: SmsParams = {
        ...optionalParams,
        text: getInput('text' satisfies keyof SmsParams, {required: true}),
        to: getInput('to' satisfies keyof SmsParams, {required: true}).split(',')
    };
    (<(keyof typeof optionalParams)[]>Object.keys(optionalParams))
        .forEach(k => (<typeof optionalParams[typeof k]>params[k]) = getInput(k));

    debug('Sending SMS');

    try {
        const apiKey = getInput('apiKey') || process.env.SEVEN_API_KEY;
        ok(apiKey);

        const client = new Client({apiKey, sentWith: 'github-action-sms'})
        const response = await new SmsResource(client).dispatch(params);
        debug('API reached, SMS dispatch ended.');
        setOutput('API response', response);

        return response;
    } catch (e) {
        const message = (e as Error).message
        error(message);
        setFailed(message);
    }
};

export default send;

send();
