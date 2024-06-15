import { AsyncLocalStorage } from 'async_hooks';
import { Level, Logger, processors, transports } from 'tripitaka';
import { datadogTransport } from '../src/transports/datadog-transport';
import { datadogProcessor } from '../src/processors/datadog-processor';
import dotenv from 'dotenv';
dotenv.config();

const { context, timestamp, augment } = processors;

const apiKey = process.env.API_KEY ?? '';

export const als = new AsyncLocalStorage<Map<string, any>>();

const localStorage = augment({
    source: () => {
        const store = als.getStore();

        /* istanbul ignore next */
        if (store) {
            return Object.fromEntries(store);
        }
    },
});

describe('Transport Datadog', () => {
    it.only('Smoke test - with tags', () => {
        const logger = new Logger({
            level: Level.TRACE,
            processors: [localStorage, context(), timestamp(), datadogProcessor()],
            transports: [
                datadogTransport({
                    apiKey: apiKey,
                    hostname: 'hostname',
                    service: 'service',
                    ddsource: 'nodejs',
                    ddtags: 'foo:bar,boo:baz',
                    intakeRegion: 'eu',
                }),
                transports.stream(),
            ],
        });
        const book = {
            title: 'Monkey',
            author: "Wu Ch'eng-en",
            ISBN10: '9780140441116',
        };

        als.run(new Map(), () => {
            als.getStore()?.set('version', '1.0.0');
            logger.trace('(TRACE) Retrieved book', { book });
            logger.debug('(DEBUG) Retrieved book', { book });
            logger.info('(INFO) Retrieved book', { book });
            logger.warn('(WARN) Retrieved book', { book });
            logger.error('(ERROR) Retrieved book');
        });
    });

    it('Smoke test - without tags', () => {
        const logger = new Logger({
            processors: [datadogProcessor()],
            transports: [
                datadogTransport({
                    apiKey: apiKey,
                    hostname: 'hostname',
                    service: 'service',
                    ddsource: 'nodejs',
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
        logger.info('(INFO) Retrieved book', { book });
    });
});
