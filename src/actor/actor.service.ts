import { Injectable } from '@nestjs/common';
import { ActorEntity } from './entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorService {
    constructor(
        @InjectRepository(ActorEntity)
        private readonly actorRepository: Repository<ActorEntity>,
    ) {}

    async create(createActorDto: CreateActorDto): Promise<ActorEntity> {
        const { name } = createActorDto;

        const actor = this.actorRepository.create({ name });

        return await this.actorRepository.save(actor);
    }
}
