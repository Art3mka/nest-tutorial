import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from 'src/generated/prisma/client';

@Injectable()
export class MovieService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<Movie[]> {
        return await this.prismaService.movie.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                actors: true,
                poster: true,
            },
        });
    }

    async findById(id: string): Promise<Movie> {
        const movie = await this.prismaService.movie.findUnique({
            where: { id },
            include: {
                actors: true,
                poster: true,
                reviews: true,
            },
        });

        if (!movie || !movie.isAvailable) {
            throw new NotFoundException('Movie not found or not available');
        }

        return movie;
    }

    async create(createMovieDto: CreateMovieDto): Promise<Movie> {
        const { title, releaseYear, actorIds, posterUrl } = createMovieDto;

        const actors = await this.prismaService.actor.findMany({
            where: {
                id: { in: actorIds },
            },
        });

        if (actors.length !== actorIds.length) {
            throw new NotFoundException('Some actors not found');
        }

        return await this.prismaService.movie.create({
            data: {
                title,
                releaseYear,
                poster: posterUrl
                    ? {
                          create: { url: posterUrl },
                      }
                    : undefined,
                actors: {
                    connect: actors.map((actor) => ({ id: actor.id })),
                },
            },
        });
    }

    async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
        const movie = await this.findById(id);
        const { title, releaseYear, posterUrl, actorIds } = updateMovieDto;

        const actors = await this.prismaService.actor.findMany({
            where: {
                id: { in: actorIds },
            },
        });

        if (actors.length !== actorIds.length) {
            throw new NotFoundException('Some actors not found');
        }

        return await this.prismaService.movie.update({
            where: { id: movie.id },
            data: {
                title,
                releaseYear,
                poster: posterUrl
                    ? {
                          create: { url: posterUrl },
                      }
                    : undefined,
                actors: {
                    connect: actors.map((actor) => ({ id: actor.id })),
                },
            },
        });
    }

    async delete(id: string): Promise<string> {
        const movie = await this.findById(id);

        await this.prismaService.movie.delete({
            where: { id: movie.id },
        });

        return movie.id;
    }
}
