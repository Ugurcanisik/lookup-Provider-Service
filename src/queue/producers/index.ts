import * as queue from '../index';
import { Logger } from '@helpers';

const publishMessage = async ({ topic, exchange, message }: { topic: string; exchange: string; message: any }) => {
    const channel = await queue.getPublisherChannel();
    try {
        await channel.assertQueue(topic, {
            deadLetterExchange: exchange,
            deadLetterRoutingKey: topic
        });
        channel.sendToQueue(topic, Buffer.from(JSON.stringify(message)));
    } catch (err) {
        Logger.error('Publish Message Error', { err });
    }
};

export { publishMessage };
