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

@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    findAll() {
        return this.movieService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.movieService.findById(id);
    }

    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.movieService.create(createMovieDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.movieService.update(id, updateMovieDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.movieService.delete(id);
    }
}
