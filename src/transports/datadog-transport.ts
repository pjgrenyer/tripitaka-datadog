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

const datadogTransport = (params: DatadogTransportParams, errorCallback: (error: any) => void): Transport => {
    const { apiKey, intakeRegion, hostname, service, ddsource, ddtags, threshold = Level.TRACE } = params;

    const url = intakeRegion === 'eu' ? 'https://http-intake.logs.datadoghq.eu/api/v2/logs' : 'https://http-intake.logs.datadoghq.com/api/v2/logs';

    return async ({ level, record }) => {
        if (!level.satisfies(threshold)) return;

        try {
            const obj = JSON.parse(record);
            await axios.post(
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
            );
        } catch (error: any) {
            errorCallback(error);
        }
    };
};

export { datadogTransport };
