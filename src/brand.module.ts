import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandRepository } from './domain/brand/repositories/brand.repository';
import { Brand } from './domain/brand/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, BrandRepository])],
  controllers: [],
  providers: [],
})
export class BrandModule {}
