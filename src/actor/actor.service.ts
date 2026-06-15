import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actor } from 'src/generated/prisma/client';

@Injectable()
export class ActorService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createActorDto: CreateActorDto): Promise<Actor> {
        const { name } = createActorDto;
        const actor = await this.prismaService.actor.create({ data: { name } });
        return actor;
    }
}
