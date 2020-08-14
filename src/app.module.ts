import {Module, OnModuleInit} from '@nestjs/common';
import {ClientKafka, ClientProxyFactory} from '@nestjs/microservices';
import {kafkaOptionsDefault} from './main';
import {KafkaConsumer} from './kafka.consumer';

const clientKafkaProvider = {
    provide: ClientKafka,
    useFactory: () => {
        return ClientProxyFactory.create(kafkaOptionsDefault())
    },
};

@Module({

    providers: [clientKafkaProvider],
    controllers: [KafkaConsumer,],
})
export class AppModule implements OnModuleInit {

    constructor(private readonly clientKafka: ClientKafka) {
    }

    onModuleInit() {
        this.clientKafka.subscribeToResponseOf('my-topic');
        console.log(`Successfully subscribed to topics`);
    }
}
