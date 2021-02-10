const core = require('@actions/core');
const Sms77Client = require('sms77-client');
const send = require('./dist/index.js').default;

jest.mock('@actions/core');
jest.mock('sms77-client');

test('Log errors', async () => {
    const unauthorizedMessage = '900';

    Sms77Client.mockImplementation(() => {
        throw new Error(unauthorizedMessage);
    });

    await send();

    expect(core.error.mock.calls.toString()).toStrictEqual(unauthorizedMessage);
    expect(core.setFailed.mock.calls.toString()).toStrictEqual(unauthorizedMessage);
});

test('Returns API response', async () => {
    const successCode = '100';

    Sms77Client.mockReturnValue({
        sms: () => successCode,
    });

    expect(await send()).toEqual(successCode);
});
