import { Processor } from 'tripitaka';

const datadogProcessor = (): Processor => {
    return ({ message, ctx }) => {
        return JSON.stringify({ message, context: ctx });
    };
};

export { datadogProcessor };
