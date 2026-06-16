import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @ApiOperation({
        summary: 'Get all movies',
        description: 'Get all movies from the database',
    })
    @ApiResponse({
        status: 200,
        description: 'The list of movies',
    })
    @Get()
    findAll() {
        return this.movieService.findAll();
    }

    @ApiOperation({
        summary: 'Get a movie by ID',
        description: 'Get a movie by ID from the database',
    })
    @ApiResponse({
        status: 200,
        description: 'The movie',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the movie',
        type: String,
    })
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.movieService.findById(id);
    }

    @ApiOperation({
        summary: 'Create a movie',
        description: 'Create a movie in the database',
    })
    @ApiResponse({
        status: 201,
        description: 'The created movie',
    })
    @ApiBody({
        type: CreateMovieDto,
    })
    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.movieService.create(createMovieDto);
    }

    @ApiOperation({
        summary: 'Update a movie',
        description: 'Update a movie in the database',
    })
    @ApiResponse({
        status: 200,
        description: 'The updated movie',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the movie',
        type: String,
    })
    @ApiBody({
        type: UpdateMovieDto,
    })
    @Put(':id')
    update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.movieService.update(id, updateMovieDto);
    }

    @ApiOperation({
        summary: 'Delete a movie',
        description: 'Delete a movie from the database',
    })
    @ApiResponse({
        status: 200,
        description: 'The deleted movie',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the movie',
        type: String,
    })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.movieService.delete(id);
    }
}
