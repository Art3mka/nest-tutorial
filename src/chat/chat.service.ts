import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) {}

    async createMessage(dto: SendMessageDto) {
        const { text } = dto;

        const message = await this.prisma.message.create({
            data: {
                text,
            },
        });

        return message;
    }
}
