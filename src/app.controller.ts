import {
    Controller,
    Get,
    Body,
    Post,
    UsePipes,
    UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UsePipes(StringToLowercasePipe)
    @Post()
    create(@Body('title') title: string) {
        return `Movie ${title}`;
    }

    @UseGuards(AuthGuard)
    @Get('@me')
    getProfile() {
        return {
            id: 1,
            username: 'testuser',
            email: 'testuser@example.com',
        };
    }
}
