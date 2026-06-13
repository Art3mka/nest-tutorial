import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(10)
    rating: number;

    @IsInt()
    @IsNotEmpty()
    movieId: number;
}
