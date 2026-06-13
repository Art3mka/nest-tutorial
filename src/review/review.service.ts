import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewEntity } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>,
        private readonly movieService: MovieService,
    ) {}

    async create(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
        const { comment, rating, movieId } = createReviewDto;

        const movie = await this.movieService.findById(movieId);

        const review = this.reviewRepository.create({
            comment,
            rating,
            movie,
        });

        return await this.reviewRepository.save(review);
    }
}
