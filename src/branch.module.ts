import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './domain/branch/entities/branch.entity';
import { BranchRepository } from './domain/branch/repositories/branch.repository';
import { BranchController } from './domain/branch/controllers/branch.controller';
import { BranchService } from './domain/branch/services/branch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, BranchRepository])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
