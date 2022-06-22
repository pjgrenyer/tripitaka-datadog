# Tripitaka Datadog

[![NPM version](https://img.shields.io/npm/v/tripitaka-datadog.svg?style=flat-square)](https://www.npmjs.com/package/tripitaka-datadog)
[![NPM downloads](https://img.shields.io/npm/dm/tripitaka-datadog.svg?style=flat-square)](https://www.npmjs.com/package/tripitaka-datadog)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg)](https://github.com/prettier/prettier)

Tripitaka Datadog provides a transport and processor for the [Tripitaka](https://www.npmjs.com/package/tripitaka) logger, which are suitable for publishing logs to [Datadog](https://www.datadoghq.com/).


## TL;DR

```js
import { Level, Logger, transports } from 'tripitaka';
import { datadogTransport } from '../src/transports/datadog-transport';
import { datadogProcessor } from '../src/processors/datadog-processor';

 const logger = new Logger({
    processors: [datadogProcessor()],
    transports: [
        datadogTransport({
            apiKey: <api-key>,
            hostname: <host-name>,
            service: <service>,
            ddsource: <source>,
            ddtags: <tags>,
            intakeRegion: 'eu',
            threshold: Level.INFO,
        }),
        transports.stream(),
    ],
});

const book = {
    title: 'Monkey',
    author: "Wu Ch'eng-en",
    ISBN10: '9780140441116',
};

const book = {
  title: "Monkey",
  author: "Wu Ch'eng-en",
  ISBN10: "9780140441116",
};

logger.info("Retrieved book", { book });
```