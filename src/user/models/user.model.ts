import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User, UserRole } from 'src/generated/prisma/client';

registerEnumType(UserRole, {
    name: 'UserRole',
});

@ObjectType()
export class UserModel implements User {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => UserRole)
    role: UserRole;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
