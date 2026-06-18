import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
    @ApiProperty({
        description: 'The access token of the user',
        example: 'eyJhbGciOiJIUzI1NiIsInR5c...',
    })
    accessToken: string;
}
