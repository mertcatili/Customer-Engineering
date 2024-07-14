import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandRepository extends Repository<Brand> {
    constructor(private dataSource: DataSource) {
        super(Brand, dataSource.createEntityManager());
    }

    public async findUserWithRoleAndId(userId: string, role: number): Promise<any> {
        return this.createQueryBuilder('b')
            .select(['u.*', 'b.name AS brand_name'])
            .innerJoin('user', 'u', 'b.id = u.brand_id')
            .where('u.role = :role', { role })
            .andWhere('u.id = :userId', { userId })
            .getRawOne();
    }

    public async findBrandByName(name: string): Promise<Brand | null> {
        return this.findOne({ where: { name } });
    }

    public async createBrand(brand: Brand): Promise<Brand> {
        return this.save(brand);
    }

    public async updateBrand(conditions: any, brand: Brand): Promise<void> {
        await this.createQueryBuilder()
            .update(Brand)
            .set(brand)
            .where(conditions)
            .execute();
    }
}