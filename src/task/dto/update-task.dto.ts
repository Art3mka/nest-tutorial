import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateTaskDto {
    @IsString({message: 'Title must be a string'})
    @IsNotEmpty({message: 'Title is required'})
    @Length(3, 20, {message: 'Title must be between 3 and 20 characters'})
    title: string;

    @IsBoolean({message: 'IsCompleted must be a boolean'})
    isCompleted: boolean;
}