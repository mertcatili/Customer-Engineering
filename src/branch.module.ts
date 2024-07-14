import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './domain/branch/entities/branch.entity';
import { BranchRepository } from './domain/branch/repositories/branch.repository';
import { BranchController } from './domain/branch/controllers/branch.controller';
import { BranchService } from './domain/branch/services/branch.service';
import { UserRepository } from './domain/auth/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, BranchRepository])],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository, UserRepository],
})
export class BranchModule {}
