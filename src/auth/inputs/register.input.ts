import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
    @Field(() => String)
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MaxLength(50, { message: 'Name must be less than 50 chars' })
    name: string;

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
