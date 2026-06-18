import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
    return new DocumentBuilder()
        .setTitle('Nest JWT auth tutorial API')
        .setDescription(
            'API description for the Nest JWT auth tutorial project',
        )
        .setVersion('1.0')
        .addBearerAuth()
        .build();
}
