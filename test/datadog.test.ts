import { Level, Logger, transports } from 'tripitaka';
import { datadogTransport } from '../src/transports/datadog-transport';
import { datadogProcessor } from '../src/processors/datadog-processor';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY ?? '';

describe('Transport Datadog', () => {
    it('Smoke test - with tags', () => {
        const logger = new Logger({
            processors: [datadogProcessor()],
            transports: [
                datadogTransport({
                    apiKey: apiKey,
                    hostname: 'hostname',
                    service: 'service',
                    ddsource: 'nodejs',
                    ddtags: 'foo:bar,boo:baz',
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
        logger.warn('(WARN) Retrieved book', { book });
        logger.error('(ERROR) Retrieved book');
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
