import amqp, { Channel, Connection } from 'amqplib';
import queueConfig from '@config/queue.config.json';
import { start as startConsumers } from './consumers';
import { Logger } from '@helpers';
import * as process from 'process';

let publisherAmqpConnection: Connection;
let publisherChannel: Channel;

let consumerAmqpConnection: Connection;
let consumerChannel: Channel;

const AMQP_URI = process.env.RABBITMQ_HOST ? `amqp://guest:guest@${process.env.RABBITMQ_HOST}/` : queueConfig.AMQP_URI;

const initializeConsumerConnection = async () => {
    try {
        return amqp.connect(AMQP_URI);
    } catch (err) {
        Logger.error('Initialize Consumer Connection Error', { err });
    }
};

const initializeProducerConnection = async () => {
    try {
        return amqp.connect(AMQP_URI);
    } catch (err) {
        Logger.error('Initialize Producer Connection Error', { err });
    }
};

const getPublisherChannel = async () => {
    if (!publisherAmqpConnection) {
        publisherAmqpConnection = (await initializeProducerConnection())!;
        publisherChannel = await publisherAmqpConnection.createChannel();
    }

    return publisherChannel;
};

const getConsumerChannel = async () => {
    if (!consumerAmqpConnection) {
        consumerAmqpConnection = (await initializeConsumerConnection())!;
        consumerChannel = await consumerAmqpConnection.createChannel();
    }

    return consumerChannel;
};

const start = async () => {
    try {
        const cChannel = await getConsumerChannel();
        await getPublisherChannel();
        await startConsumers(cChannel);
    } catch (err) {
        Logger.error('RabbitMQ Start Error', { err });
    }
};

export { getPublisherChannel, getConsumerChannel, start };
