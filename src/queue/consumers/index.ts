import { Channel } from 'amqplib';
import { loggingConsumer } from './logging';
import { createCountryConsumer } from './createCountry';

const start = async (consumerChannel: Channel) => {
    await loggingConsumer(consumerChannel);
    await createCountryConsumer(consumerChannel);
};

export { start };
