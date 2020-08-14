import {Controller} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";

@Controller('/kafka/consmer')
export class KafkaConsumer {

    constructor() {
    }

    @MessagePattern('my-topic')
    async processCustomerCommandMessage(kafkaMessage) {
        console.log(kafkaMessage.value.toString())
    }
}
