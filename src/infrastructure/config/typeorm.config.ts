import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Branch } from '../../domain/branch/entities/branch.entity';
import { User } from '../../domain/auth/entities/user.entity';
import { Brand } from '../../domain/brand/entities/brand.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.HOST || 'mysql',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'customer_engineering',
  entities: [Branch, User, Brand],
  synchronize: true,
};