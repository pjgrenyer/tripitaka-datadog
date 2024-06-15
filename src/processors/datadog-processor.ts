import { Processor } from 'tripitaka';

const datadogProcessor = (): Processor => {
    return ({ message, record }) => {
        return JSON.stringify({ message, context: record });
    };
};

export { datadogProcessor };
