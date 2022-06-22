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

    const queryParams = new URLSearchParams();
    queryParams.append(hostname, hostname);
    queryParams.append('service', service);
    queryParams.append('ddsource', ddsource);
    if (ddtags) queryParams.append('ddtags', ddtags);

    const url =
        intakeRegion === 'eu'
            ? `https://http-intake.logs.datadoghq.eu/v1/input/${apiKey}?${queryParams.toString()}`
            : `https://http-intake.logs.datadoghq.com/v1/input/${apiKey}?${queryParams.toString()}`;

    return async ({ level, record }) => {
        if (!level.satisfies(threshold)) return;
        await axios.post(url, { level: level.name, message: record });
    };
};

export { datadogTransport };
