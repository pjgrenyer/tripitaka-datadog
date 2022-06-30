import { Processor } from 'tripitaka';

const datadogProcessor = (): Processor => {
    return ({ message, ctx }) => {
        return `${message} ${JSON.stringify(ctx, null, 2)}`.trim();
    };
};

export { datadogProcessor };
