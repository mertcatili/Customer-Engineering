import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './domain/auth/controllers/auth.controller';
import { AuthService } from './domain/auth/services/auth.service';
import { UserRepository } from './domain/auth/repositories/user.repository';
import { Crypto } from 'src/shared/utils/Crypto';
import { User } from './domain/auth/entities/user.entity';
import { BrandRepository } from './domain/brand/repositories/brand.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, BrandRepository, Crypto],
})
export class AuthModule {}
