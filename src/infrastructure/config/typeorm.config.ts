import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Branch } from '../../domain/branch/entities/branch.entity';
import { User } from 'src/domain/auth/entities/user.entity';
import { Brand } from 'src/domain/brand/entities/brand.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'admin',
  password: 'password',
  database: 'customer_engineering',
  entities: [Branch, User, Brand],
  synchronize: true,
};