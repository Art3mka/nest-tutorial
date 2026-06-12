import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MovieController {
    @Get()
    findAll(@Query() query: any) {
        return `Фильмы с параметрами ${JSON.stringify(query)}`;
    }

    @Post()
    create(@Body() body: { title: string; genre: string }) {
        return `Фильмы с параметрами ${JSON.stringify(body)} создан`;
    }
}
