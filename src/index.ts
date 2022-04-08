import {debug, error, getInput, InputOptions, setFailed, setOutput} from '@actions/core'
import Sms77Client, {SmsParams} from 'sms77-client';
import fetch from 'node-fetch';
import {ok} from 'assert';

(global as any).fetch = fetch;

type Type = Pick<SmsParams,
    'delay' | 'foreign_id' | 'from' | 'json' | 'label' | 'text' | 'to' | 'ttl' | 'udh'>;


const getKeyByType =  (key: keyof Type, options?: InputOptions): string => getInput(key, options)

const parseBool = (value: string): boolean => value === '1' || value === 'true'

export default async function send() {
    const smsParams: Type = {
        text:  getKeyByType('text', {required: true}),
        to: getKeyByType('to', {required: true}),
    };

    const delay = getKeyByType('delay')
    if (delay) smsParams.delay = delay

    const foreignId = getKeyByType('foreign_id')
    if (foreignId) smsParams.foreign_id = foreignId

    const from = getKeyByType('from')
    if (from) smsParams.from = from

    const json = parseBool(getKeyByType('json'))
    if (json) smsParams.json = json

    const label = getKeyByType('label')
    if (label) smsParams.label = label

    const ttl = Number.parseInt(getKeyByType('ttl'))
    if (!Number.isNaN(ttl)) smsParams.ttl = ttl

    const udh = getKeyByType('udh')
    if (udh) smsParams.udh = udh

    debug('Sending SMS');

    try {
        const apiKey = getInput('apiKey') || process.env.SMS77_API_KEY;
        ok(apiKey);

        const client = new Sms77Client(apiKey, 'github-action-sms');
        const response = await client.sms(smsParams);
        debug('API reached, SMS dispatch ended.');
        setOutput('API response', response);

        return response;
    } catch (e) {
        error((e as Error).message);
        setFailed((e as Error).message);
    }
};

send();