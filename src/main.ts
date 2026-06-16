import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());

    const config = new DocumentBuilder()
        .setTitle('Nest Tutorial API')
        .setDescription('API description for the Nest Tutorial project')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/docs', app, document, {
        jsonDocumentUrl: '/swagger.json',
        yamlDocumentUrl: '/swagger.yaml',
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
