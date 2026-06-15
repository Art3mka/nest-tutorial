import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from 'src/generated/prisma/client';

@Injectable()
export class ReviewService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const { comment, rating, movieId } = createReviewDto;
        const review = await this.prismaService.review.create({
            data: {
                comment,
                rating,
                movie: {
                    connect: {
                        id: movieId,
                    },
                },
            },
        });
        return review;
    }
}
