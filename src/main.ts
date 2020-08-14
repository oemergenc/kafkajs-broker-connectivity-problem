import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from "@nestjs/platform-express";
import {KafkaOptions, Transport} from '@nestjs/microservices';
import {AppModule} from './app.module';
import {Kafka} from 'kafkajs';

export function kafkaOptionsDefault(): KafkaOptions {
    return {
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'bd-omm-recipe-recommendation-router',
                brokers: ['kafka:9093'],
            },
            consumer: {
                groupId: 'my-kafka-consumer-v002',//-server
                allowAutoTopicCreation: false,
                maxWaitTimeInMs: 500
            }
        }
    };
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.connectMicroservice(kafkaOptionsDefault());
    await app.startAllMicroservicesAsync();
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['kafka:9093']
    })
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'my-topic',
        messages: [
            {value: 'Hello KafkaJS consumer from main!'},
        ],
    })
    await app.listen('3149');
}

bootstrap();

