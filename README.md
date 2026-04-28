<p align="center">
  <img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" alt="seven logo" />
</p>

<h1 align="center">seven SMS - GitHub Action</h1>

<p align="center">
  Send SMS from any GitHub Actions workflow via the seven gateway. Useful for deployment alerts, on-call notifications and CI status pings.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg" alt="MIT License" /></a>
  <a href="https://github.com/marketplace/actions/seven-sms"><img src="https://img.shields.io/badge/GitHub-Marketplace-181717" alt="GitHub Marketplace" /></a>
  <img src="https://img.shields.io/badge/Node.js-runtime-brightgreen" alt="Node.js runtime" />
</p>

---

## Features

- **Drop-in Workflow Step** - Add a single `uses:` line to send SMS from any job
- **Bulk Recipients** - Comma-separate phone numbers or contact-book entries
- **Scheduling & TTL** - `delay` and `ttl` inputs for delayed dispatch and message validity windows
- **Foreign IDs & Labels** - Tag messages for downstream tracking via `foreign_id` / `label`

## Prerequisites

- A [seven account](https://www.seven.io/) with API key ([How to get your API key](https://help.seven.io/en/developer/where-do-i-find-my-api-key))
- The `SEVEN_API_KEY` secret configured under **Settings > Secrets and variables > Actions**

## Usage

```yaml
- name: Send SMS
  uses: seven-io/github-action-sms@master
  with:
    from: 'Tommy Tester'
    text: 'seven.io wishes you a nice day!'
    to:   '+4901234567890,Tina Testing'
  env:
    SEVEN_API_KEY: ${{ secrets.SEVEN_API_KEY }}
```

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `apiKey` | yes* | seven API key. *Optional if `SEVEN_API_KEY` env var is set. |
| `to` | yes | Phone number(s) or contact(s), comma-separated |
| `text` | yes | Message body |
| `from` | no | Sender ID. Up to 11 alphanumeric or 16 numeric characters |
| `delay` | no | Delayed dispatch (Unix timestamp or `yyyy-mm-dd hh:ii`) |
| `ttl` | no | Time-to-live in minutes. Default `2880` (48h) |
| `foreign_id` | no | Foreign ID for callbacks. Allowed: `a-z A-Z 0-9 .-_@` |
| `label` | no | Custom label. Allowed: `a-z A-Z 0-9 .-_@` |
| `udh` | no | User Data Header for binary SMS (advanced) |

## Outputs

| Output | Description |
|--------|-------------|
| `response` | API [return code](https://www.seven.io/en/docs/gateway/http-api/sms-dispatch#return) |

## Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/) or [open an issue](https://github.com/seven-io/github-action-sms/issues).

## License

[MIT](LICENSE)
