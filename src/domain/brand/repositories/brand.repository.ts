import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandRepository extends Repository<Brand> {
    constructor(private dataSource: DataSource) {
        super(Brand, dataSource.createEntityManager());
    }

    public async findBrandByUserId(id: string): Promise<Brand | null> {
        return this.findOne({ where: { id } });
    }
}
