import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
        },
        {
            id: 3,
            name: 'Artem Shein',
            email: 'artem.shein@example.com',
        },
    ];

    findAll() {
        return this.users;
    }
}
