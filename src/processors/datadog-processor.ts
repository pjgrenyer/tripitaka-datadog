import { Processor } from 'tripitaka';

const datadogProcessor = (): Processor => {
    return ({ level, message, ctx }) => {
        return `[${level.name}] - ${message} ${JSON.stringify(ctx, null, 2)}`;
    };
};

export { datadogProcessor };
