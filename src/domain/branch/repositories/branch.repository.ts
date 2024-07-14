import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Branch } from '../entities/branch.entity';

@Injectable()
export class BranchRepository extends Repository<Branch> {
    constructor(private dataSource: DataSource) {
        super(Branch, dataSource.createEntityManager());
    }

    public async createBranch(branch: Branch): Promise<Branch> {
        return this.save(branch);
    }

    public async updateBranch(conditions: any, branch: Branch): Promise<void> {
        await this.createQueryBuilder()
            .update(Branch)
            .set(branch)
            .where(conditions)
            .execute();
    }

    public async findBranchByBrandId(branchId: string): Promise<Branch | null> {
        return this.findOne({ where: { id: branchId } });
    }

    public async findBranchesByUserId(userId: string): Promise<Branch[]> {
        return this.createQueryBuilder('b')
            .innerJoin('user', 'u', 'b.brand_id = u.brand_id')
            .where('u.id = :userId', { userId })
            .select(['b.id', 'b.brand_id', 'b.name', 'b.full_address', 'b.latitude', 'b.longitude', 'b.location', 'b.phone', 'b.is_active', 'b.created_at'])
            .getMany();
    }
}