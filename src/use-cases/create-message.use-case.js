import { createMessageChannel } from '/messages/';

const createMessage = async (request, response) => {
  const messageChannel = await createMessageChannel();

  const data = { data: new Date(Date.now()), mensagem: "hehe" }

  const mensagem = JSON.stringify(data)

  messageChannel.sendToQueue(
    process.env.QUEUE_NAME,
    Buffer.from(mensagem)
  )

  response.json({ message: "Mensagem criada com sucesso", });
}

export { createMessage }