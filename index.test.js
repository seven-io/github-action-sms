const core = require('@actions/core');
const SevenClient = require('@seven.io/api');
const send = require('./dist/index.js').default;

jest.mock('@actions/core');
jest.mock('@seven.io/api');

test('Log errors', async () => {
    const unauthorizedMessage = '900';

    SevenClient.mockImplementation(() => {
        throw new Error(unauthorizedMessage);
    });

    await send();

    expect(core.error.mock.calls.toString()).toStrictEqual(unauthorizedMessage);
    expect(core.setFailed.mock.calls.toString()).toStrictEqual(unauthorizedMessage);
});

test('Returns API response', async () => {
    const successCode = '100';

    SevenClient.mockReturnValue({
        sms: () => successCode,
    });

    expect(await send()).toEqual(successCode);
});
