<img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" />

# Official seven.io SMS GitHub Action

Send an SMS from GitHub Actions.

## Prerequisites

- An account at seven.io. [Sign up for free](https://app.seven.io/signup)!
- Account balance and an [API Key](https://help.seven.io/en/api-key-access).

## Usage

1. Set up your credentials secrets in your repository settings by
   specifying `SEVEN_API_KEY`.

2. Add the following to your workflow

```yaml
- name: 'Send SMS'
  uses: seven-io/github-action-sms@master
  with:
    from: 'Tommy Tester'
    text: 'seven.io wishes you a nice day!'
    to: '+94768729736,Tina Testing'
  env:
    SEVEN_API_KEY: ${{ secrets.SEVEN_API_KEY }}
```

## Inputs

`apiKey` **Required**

An API Key from seven.io. Alternatively use environment variable SEVEN_API_KEY.

`to` **Required**

Phone number(s) or contact(s) separated by comma to send the SMS to

`text` **Required**

The actual message content you want to send to the recipient(s)

`delay`

Delayed dispatch at given time: Unix-Timestamp or format yyyy-mm-dd hh:ii

`foreign_id`

Foreign ID returned in callbacks. Allowed characters: a-z, A-Z, 0-9, .-_@

`from`

Sender ID; max 16 numeric or 11 alphanumeric characters

`label`

Custom label. Allowed characters: a-z, A-Z, 0-9, .-_@

`ttl`

Time To Live in minutes. Default is 2880

`udh`

User Data Header: If set and text contains Hexcode the sms gets sent as 8-bit binary

## Outputs

`response`

Returns a [return code](https://www.seven.io/en/docs/gateway/http-api/sms-dispatch#return)
from the API.

## License

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
