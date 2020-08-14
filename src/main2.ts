import {Kafka} from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app-2',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

const run = async () => {
    // Producing
    await producer.connect()
    await producer.send({
        topic: 'my-topic',
        messages: [
            {value: 'Hello KafkaJS user!'},
        ],
    })
}

run().catch(console.error)
