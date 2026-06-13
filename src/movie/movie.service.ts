import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly movieRepository: Repository<MovieEntity>,
        @InjectRepository(MoviePosterEntity)
        private readonly moviePosterRepository: Repository<MoviePosterEntity>,
        @InjectRepository(ActorEntity)
        private readonly actorRepository: Repository<ActorEntity>,
    ) {}

    async findAll(): Promise<MovieEntity[]> {
        return await this.movieRepository.find({
            order: { createdAt: 'DESC' },
            relations: { actors: true },
        });
    }

    async findById(id: number): Promise<MovieEntity> {
        const movie = await this.movieRepository.findOne({
            where: {
                id,
            },
            relations: { actors: true },
        });

        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        return movie;
    }

    async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
        const { title, releaseYear, actorIds, posterUrl } = createMovieDto;

        const actors = await this.actorRepository.find({
            where: { id: In(actorIds) },
        });

        if (actors.length !== actorIds.length) {
            throw new NotFoundException('Some actors not found');
        }

        let poster: MoviePosterEntity | null = null;

        if (posterUrl) {
            poster = await this.moviePosterRepository.create({
                url: posterUrl,
            });
            await this.moviePosterRepository.save(poster);
        }

        const movie = this.movieRepository.create({
            title,
            releaseYear,
            actors,
            poster,
        });

        return await this.movieRepository.save(movie);
    }

    async update(
        id: number,
        updateMovieDto: UpdateMovieDto,
    ): Promise<MovieEntity> {
        const movie = await this.findById(id);

        Object.assign(movie, updateMovieDto);

        return await this.movieRepository.save(movie);
    }

    async delete(id: number): Promise<number> {
        const movie = await this.findById(id);

        await this.movieRepository.remove(movie);

        return movie.id;
    }
}
