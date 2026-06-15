import { Controller, Post, Body } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorController {
    constructor(private readonly actorService: ActorService) {}
    
    @Post()
    create(@Body() createActorDto: CreateActorDto) {
        return this.actorService.create(createActorDto);
    }
}
