![](https://www.sms77.io/wp-content/uploads/2019/07/sms77-Logo-400x79.png "sms77 Logo")

# Official [sms77](https://www.sms77.io) SMS GitHub Action

Send SMS via GitHub Actions.

## Prerequisites

- An account at sms77. [Sign up for free](https://app.sms77.io/anmelden)!
- Account balance and an API
  key [which you can get here](https://app.sms77.io/developer).

## Usage

1. Set up your credentials secrets in your repository settings by
   specifying `SMS77_API_KEY`.

2. Add the following to your workflow

```yaml
- name: 'Send SMS'
  uses: sms77io/github-action-sms@master
  with:
    from: 'Tommy Tester'
    text: 'sms77 wishes you a nice day!'
    to: '+4901234567890,Tina Testing' # specify multiple recipients separated by comma
  env:
    SMS77_API_KEY: ${{ secrets.SMS77_API_KEY }}
```

## Inputs

`apiKey` **Required**

An API Key from sms77. Alternatively use environment variable SMS77_API_KEY.

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

`json`

If enabled, the API returns a detailed JSON response

`label`

Custom label. Allowed characters: a-z, A-Z, 0-9, .-_@

`ttl`

Time To Live in minutes. Default is 2880

`udh`

User Data Header: If set and text contains Hexcode the SMS gets sent as 8-bit binary

## Outputs

`response`

Returns a [return code](https://www.sms77.io/en/docs/gateway/http-api/sms-dispatch/#return)
from the API.

## License

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)