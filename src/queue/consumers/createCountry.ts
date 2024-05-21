import { Channel } from 'amqplib';
import { queue as queueConstants } from '@constants';
import { queue as queueHelper } from '@helpers';
import { country as countryService } from '@services';
import { publishMessage } from '../producers';

const consume = async (channel: Channel) => {
    await channel.prefetch(queueConstants.PREFETCH_SIZE.default);
    await channel.assertQueue(queueConstants.TOPIC.createCountryEvents, {
        deadLetterExchange: queueConstants.EXCHANGE.routingFailed,
        deadLetterRoutingKey: queueConstants.TOPIC.createCountryEvents
    });

    await channel.consume(queueConstants.TOPIC.createCountryEvents, async (message: any) => {
        const { headers } = queueHelper.retryCountCalculator(message.properties);
        Object.assign(message.properties, { headers });
        try {
            const content = JSON.parse(message.content.toString());
            await countryService.createCountry(content);
            await publishMessage({
                topic: queueConstants.TOPIC.loggingEvents,
                exchange: queueConstants.EXCHANGE.routingFailed,
                message: content
            });
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

export { consume as createCountryConsumer };
