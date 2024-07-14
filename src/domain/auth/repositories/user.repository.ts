import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    public async findOneByEmail(email: string): Promise<User | null> {
        return this.findOne({ where: { email } });
    }

    public async saveUser(user: User): Promise<User> {
        return this.save(user);
    }

    public async findOneByEmailAndRole(email: string, role: number): Promise<User | null> {
        return this.findOne({ where: { email, role } });
    }
}
