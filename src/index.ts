import {debug, error, getInput, setFailed, setOutput} from '@actions/core';
import Sms77Client, {SmsParams} from 'sms77-client';
import fetch from 'node-fetch';

(global as any).fetch = fetch;

type Type = Pick<SmsParams,
    'delay' | 'foreign_id' | 'from' | 'label' | 'text' | 'to' | 'ttl' | 'udh'>;

const smsParams: Type = {
    delay: undefined,
    foreign_id: undefined,
    from: undefined,
    label: undefined,
    text: '',
    to: '',
    ttl: undefined,
    udh: undefined,
};

const send = async () => {
    (<(keyof Type)[]>Object.keys(smsParams))
        .forEach(k => (<Type[typeof k]>smsParams[k]) = getInput(k));

    const apiKey = getInput('apiKey') || process.env.SMS77_API_KEY;

    debug('Sending SMS');

    try {
        const response = await (new Sms77Client(apiKey!))
            .sms(smsParams) as string;
        debug('API reached, SMS dispatch ended.');
        setOutput('API response', response);

        return response;
    } catch (e) {
        error(e.message);
        setFailed(e.message);
    }
};

export default send;

send();