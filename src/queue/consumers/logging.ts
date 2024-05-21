import { Channel } from 'amqplib';
import { queue as queueConstants } from '@constants';
import { Logger, queue as queueHelper } from '@helpers';

const consume = async (channel: Channel) => {
    await channel.prefetch(queueConstants.PREFETCH_SIZE.default);
    await channel.assertQueue(queueConstants.TOPIC.loggingEvents, {
        deadLetterExchange: queueConstants.EXCHANGE.routingFailed,
        deadLetterRoutingKey: queueConstants.TOPIC.loggingEvents
    });

    await channel.consume(queueConstants.TOPIC.loggingEvents, async (message: any) => {
        const { headers } = queueHelper.retryCountCalculator(message.properties);
        Object.assign(message.properties, { headers });
        try {
            const content = JSON.parse(message.content.toString());
            Logger.info(`Logging Consumer: ${content.content.name} has been created!`);
            return channel.ack(message);
        } catch (err) {
            channel.publish(
                queueConstants.EXCHANGE.routingDeadLetter,
                message.fields.routingKey,
                message.content,
                message.properties
            );
            channel.ack(message);
        }
    });
};

export { consume as loggingConsumer };
