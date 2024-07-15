import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './domain/auth/controllers/auth.controller';
import { AuthService } from './domain/auth/services/auth.service';
import { UserRepository } from './domain/auth/repositories/user.repository';
import { User } from './domain/auth/entities/user.entity';
import { BrandRepository } from './domain/brand/repositories/brand.repository';
import { CryptoService } from './shared/utils/CryptoService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, BrandRepository, CryptoService],
})
export class AuthModule {}
