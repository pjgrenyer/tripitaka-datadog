# Tripitaka Datadog

[![NPM version](https://img.shields.io/npm/v/tripitaka-datadog.svg?style=flat-square)](https://www.npmjs.com/package/tripitaka-datadog)
[![NPM downloads](https://img.shields.io/npm/dm/tripitaka-datadog.svg?style=flat-square)](https://www.npmjs.com/package/tripitaka-datadog)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg)](https://github.com/prettier/prettier)

Tripitaka Datadog provides a transport and processor for the [Tripitaka](https://www.npmjs.com/package/tripitaka) logger, which are suitable for publishing logs to [Datadog](https://www.datadog.com/).


## TL;DR

```js
const { Logger } = require("tripitaka");
const { datadogProcessor, datadogTransport } = require("tripitaka-datadog");

const options = {
    endpoint: <sumo-endpoint>,
    sourceName: <source-name>,
    sessionKey: <session-key>,
    clientUrl: <client-url>,
    onError: () => {
        console.log('Sumo Error!');
    },
};

const logger = new Logger({
    processors: [datadogProcessor()],
    transports: [datadogTransport(options)]
});

const book = {
  title: "Monkey",
  author: "Wu Ch'eng-en",
  ISBN10: "9780140441116",
};

logger.info("Retrieved book", { book });
```