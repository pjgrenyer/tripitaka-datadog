import { Level, Transport } from 'tripitaka';
import axios from 'axios';

interface DatadogTransportParams {
    apiKey: string;
    hostname: string;
    service: string;
    ddsource: string;
    ddtags?: string;
    intakeRegion: 'us' | 'eu';

    threshold?: Level;
}

const datadogTransport = (params: DatadogTransportParams): Transport => {
    const { apiKey, intakeRegion, hostname, service, ddsource, ddtags, threshold = Level.TRACE } = params;

    const url = intakeRegion === 'eu' ? 'https://http-intake.logs.datadoghq.eu/api/v2/logs' : 'https://http-intake.logs.datadoghq.com/api/v2/logs';

    return ({ level, record }) => {
        if (!level.satisfies(threshold)) return;

        const obj = JSON.parse(record);
        axios
            .post(
                url,
                [
                    {
                        ddsource: ddsource,
                        ddtags: ddtags,
                        hostname: hostname,
                        message: obj.message,
                        service: service,
                        level: level.name?.toLowerCase(),
                        context: obj.context,
                    },
                ],
                { headers: { 'DD-API-KEY': apiKey } }
            )
            .catch((error) => {
                const statusCode = error.response?.status;
                const statusText = error.response?.statusText;
                const response = error.response?.data ?? error.message;
                // eslint-disable-next-line no-console
                console.log(
                    `Failed to log to DataDog: ${JSON.stringify(
                        {
                            error,
                            statusCode,
                            statusText,
                            response,
                        },
                        null,
                        2
                    )}`
                );
            });
    };
};

export { datadogTransport };
