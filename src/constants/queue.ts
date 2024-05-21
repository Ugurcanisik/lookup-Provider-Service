const TOPIC = {
    loggingEvents: 'LOGGING_EVENTS',
    createCountryEvents: 'CREATE_COUNTRY_EVENTS'
} as const;

const EXCHANGE = {
    routingFailed: 'ROUTING_FAILED',
    routingDeadLetter: 'ROUTING_DEADLETTER',
    routingRetry: 'Routing_Retry',
    routingDelayed: 'ROUTING_DELAYED'
} as const;

const PREFETCH_SIZE = {
    default: 1
} as const;

export { TOPIC, EXCHANGE, PREFETCH_SIZE };
