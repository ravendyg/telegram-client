## Telegram parser tool

Command line interface app to get data from telegram.

In the first place I needed it to scan through some channels with statisitcs that I was interested in. Will get back later to research the telegram API and to add some functionality.

### Installation
* create a Telegram app
* clone
* `npm i`
* provide `.env` file in the project root. It should contain API_ID, API_HASH, and API_PHONE variables.

### Start
`npm run start`

First several times it would ask for a PIN code that you would receive in telegram.

### References
* [Telegram API](https://core.telegram.org/api)
* All the heavylifting is done by this library: [mtproto-core](https://github.com/alik0211/mtproto-core)

### TODO
* create subscrriptions to channels
* add functionality to send data (HTTP, maybe Google Sheets)
