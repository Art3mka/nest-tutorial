import {
    IsInt,
    IsNotEmpty,
    IsString,
    Max,
    Min,
    IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The title of the movie',
        example: 'The Dark Knight',
    })
    title: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1900)
    @Max(new Date().getFullYear())
    @ApiProperty({
        description: 'The release year of the movie',
        example: 2008,
    })
    releaseYear: number;

    @IsArray()
    @IsNotEmpty()
    @IsInt({ each: true })
    @ApiProperty({
        description: 'The IDs of the actors in the movie',
        example: ['1', '2', '3'],
    })
    actorIds: string[];

    @IsString()
    @ApiPropertyOptional({
        description: 'The URL of the poster of the movie',
        example: 'https://example.com/poster.jpg',
    })
    posterUrl: string;
}
