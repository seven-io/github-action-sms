const core = require('@actions/core')
const {Client, SmsResource} = require('@seven.io/client')
const send = require('./dist/index.js').default

jest.mock('@actions/core')
jest.mock('@seven.io/client')

test('Log errors', async () => {
    const unauthorizedMessage = '900'

    Client.mockImplementation(() => {
        throw new Error(unauthorizedMessage)
    })

    await send({to: ''})

    expect(core.error.mock.calls.toString()).toStrictEqual(unauthorizedMessage)
    expect(core.setFailed.mock.calls.toString()).toStrictEqual(unauthorizedMessage)
})

test('Returns API response', async () => {
    const successCode = {
        balance: 126.018,
        debug: 'false',
        messages: [{
            encoding: 'gsm',
            error: null,
            error_text: null,
            id: '77258685919',
            is_binary: false,
            label: null,
            parts: 1,
            price: 0.075,
            recipient: '491716992343',
            sender: 'SMS',
            success: true,
            text: 'text',
            udh: null,
        }],
        sms_type: 'direct',
        success: '100',
        total_price: 0.15
    }

    SmsResource.mockReturnValue({
        dispatch: () => successCode,
    })

    expect(await send({to: ''})).toEqual(successCode)
})
