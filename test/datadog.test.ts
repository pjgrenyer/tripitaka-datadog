import { Level, Logger, transports } from 'tripitaka';
import { v4 } from 'uuid';
import { datadogTransport } from '../src/transports/datadog-transport';
import { datadogProcessor } from '../src/processors/datadog-processor';
import dotenv from 'dotenv';
dotenv.config();

const SUMO_LOGIC_ENDPOINT = process.env.SUMO_LOGIC_ENDPOINT ?? '';
const sourceName = 'tripitaka';
const clientUrl = 'http://tripitaka';


describe('Transport Datadog', () => {
    it('Smoke test', () => {
        const logger = new Logger({
            processors: [datadogProcessor()],
            transports: [datadogTransport({ threshold: Level.WARN }), transports.stream()],
        });
        const book = {
            title: 'Monkey',
            author: "Wu Ch'eng-en",
            ISBN10: '9780140441116',
        };
        logger.info('(INFO) Retrieved book', { book });
        logger.warn('(WARN) Retrieved book', { book });
        logger.error('(ERROR) Retrieved book', { book });
    });
});
