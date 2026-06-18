import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
    @Field(() => Number)
    id: number;
    @Field(() => String)
    email: string;
    @Field(() => String)
    username: string;
}
