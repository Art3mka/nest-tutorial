import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
} from 'class-validator';

@InputType()
export class LoginInput {
    @Field(() => String)
    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @Field(() => String)
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 8 chars' })
    @MaxLength(50, { message: 'Password must be less than 50 chars' })
    password: string;
}
