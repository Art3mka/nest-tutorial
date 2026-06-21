import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User, UserRole } from 'src/generated/prisma/client';

registerEnumType(UserRole, {
    name: 'UserRole',
});

@ObjectType({
    description: 'User model',
})
export class UserModel implements User {
    @Field(() => ID, {
        description: 'User ID',
    })
    id: string;

    @Field(() => String, {
        description: 'User name',
        defaultValue: 'Artem',
        nullable: false,
    })
    name: string;

    @Field(() => String, {
        description: 'User email',
        defaultValue: 'artem@example.com',
        nullable: false,
    })
    email: string;

    @Field(() => String, {
        description: 'User password',
        defaultValue: 'password',
        nullable: false,
    })
    password: string;

    @Field(() => UserRole, {
        description: 'User role',
        defaultValue: UserRole.USER,
        nullable: false,
    })
    role: UserRole;

    @Field(() => Date, {
        description: 'User created at',
        defaultValue: new Date(),
        nullable: false,
    })
    createdAt: Date;

    @Field(() => Date, {
        description: 'User updated at',
        defaultValue: new Date(),
        nullable: false,
    })
    updatedAt: Date;
}
