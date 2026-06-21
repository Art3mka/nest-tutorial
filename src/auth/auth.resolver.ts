import { Resolver, Query, Context, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthModel } from './models/auth.model';
import type { GqlContext } from 'src/common/interfaces/gql-context.interface';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthModel)
    async register(
        @Context() { res }: GqlContext,
        @Args('data') registerInput: RegisterInput,
    ) {
        return this.authService.register(res, registerInput);
    }

    @Mutation(() => AuthModel)
    async login(
        @Context() { res }: GqlContext,
        @Args('data') loginInput: LoginInput,
    ) {
        return this.authService.login(res, loginInput);
    }

    @Mutation(() => AuthModel)
    async refresh(@Context() { req, res }: GqlContext) {
        return this.authService.refresh(req, res);
    }
    
    @Mutation(() => Boolean)
    async logout(@Context() { res }: GqlContext) {
        return this.authService.logout(res);
    }
}
