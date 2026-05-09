import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length, IsEnum, Matches } from "class-validator";

export enum TaskTag {
    WORK = 'work',
    STUDY = 'study',
    HOME = 'home',
}

export class CreateTaskDto {
    @IsString({message: 'Title must be a string'})
    @IsNotEmpty({message: 'Title is required'})
    @Length(3, 20, {message: 'Title must be between 3 and 20 characters'})
    title: string;

    @IsString({message: 'Description must be a string'})
    @IsOptional()
    description: string;

    @IsInt({message: 'Priority must be a integer number'})
    @IsPositive({message: 'Priority must be a positive integer number'})
    @IsOptional()
    priority: number;

    @IsArray({message: 'Tags must be an array'})
    @IsEnum(TaskTag, {each: true, message: 'Each tag must be a valid tag'})
    @IsOptional()
    tags: TaskTag[];

    @IsString({message: 'Password must be a string'})
    @IsNotEmpty({message: 'Password is required'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character'})
    password: string;
}