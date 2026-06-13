import {
    IsInt,
    IsNotEmpty,
    IsString,
    Max,
    Min,
    IsArray,
} from 'class-validator';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1900)
    @Max(new Date().getFullYear())
    releaseYear: number;

    @IsArray()
    @IsNotEmpty()
    @IsInt({ each: true })
    actorIds: number[];

    @IsString()
    posterUrl: string;
}
