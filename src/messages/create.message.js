import { connect } from "amqplib";

const QUEUE_NAME = process.env.QUEUE_NAME;
const AMQP_SERVER = process.env.AMQP_SERVER;

let connection;

const LOG_CONNECTED = 'Connected to RabbitMQ';
const LOG_CHANNEL_NOT_AVAILABLE = 'Channel is not available';
const LOG_MESSAGE_PUBLISHED = 'Message published to the queue';
const LOG_ERROR_CONNECT = 'Error while trying to connect to RabbitMQ';
const LOG_ERROR_PUBLISH = 'Error while publishing message';

const createMessageChannel = async () => {
  try {
    if (!connection) {
      connection = await connect(AMQP_SERVER);
      console.log(LOG_CONNECTED);
    }

    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);

    return channel;
  } catch (err) {
    console.error(LOG_ERROR_CONNECT, err);
    return null;
  }
}

const publishMessage = async (channel, message) => {
  try {
    if (!channel) {
      console.log(LOG_CHANNEL_NOT_AVAILABLE);
      return;
    }

    await channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
    console.log(LOG_MESSAGE_PUBLISHED);
  } catch (err) {
    console.error(LOG_ERROR_PUBLISH, err);
  }
}

const consumeMessages = async () => {
  const channel = await createMessageChannel();

  channel.consume(QUEUE_NAME, async (msg) => {
    const candleObj = JSON.parse(msg.content.toString());
    console.log('Message received');
    console.log(candleObj);
    channel.ack(msg);
  });

  console.log('Candle consumer started');
}

export { consumeMessages, publishMessage, createMessageChannel }
