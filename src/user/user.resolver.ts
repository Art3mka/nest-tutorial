import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UserRole, type User } from 'src/generated/prisma/client';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Authorization()
    @Query(() => UserModel, {
        name: 'getMe',
        description: 'Get current user',
    })
    getMe(@Authorized() user: User) {
        return user;
    }

    @Authorization(UserRole.ADMIN)
    @Query(() => [UserModel], {
        name: 'findAllUsers',
        description: 'Find all users',
    })
    async findAll() {
        return await this.userService.findAll();
    }
}
