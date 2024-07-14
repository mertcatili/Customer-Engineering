import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandRepository } from './domain/brand/repositories/brand.repository';
import { Brand } from './domain/brand/entities/brand.entity';
import { BrandController } from './domain/brand/controllers/brand.controller';
import { BrandService } from './domain/brand/services/brand.service';
import { UserRepository } from './domain/auth/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, BrandRepository])],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository, UserRepository],
})
export class BrandModule {}
