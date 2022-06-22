import { Level, Transport } from 'tripitaka';

interface DatadogTransportParams {
    threshold?: Level;
}

const datadogTransport = (params: DatadogTransportParams = {}): Transport => {
    const { threshold = Level.TRACE } = params;
  
    // https://http-intake.logs.datadoghq.eu/v1/input/
    // https://http-intake.logs.datadoghq.com/v1/input/
    /*
        apiKey: 'b7e5c8ec72edf3da0cbb4710e31dac65',
    hostname: 'pauls-mac',
    service: 'pg-dd-pod',
    ddsource: 'nodejs',
    ddtags: 'foo:bar,boo:baz',
    intakeRegion: 'eu', // This is the important bit.
    */

    return ({ level, record }) => {
        if (!level.satisfies(threshold)) return;      
    };
};

export { datadogTransport };
