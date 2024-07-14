import { Injectable } from '@nestjs/common';
import { ErrorResult, Result, SuccessResult } from 'src/shared/utils/Result';
import BaseResponseDto from 'src/application/dtos/base.response.dto';
import { BrandRepository } from '../repositories/brand.repository';
import CreateBrandRequestDto from '../dtos/create.brand.request.dto';
import { RoleTypes } from 'src/infrastructure/enums/Enums';
import { Brand } from '../entities/brand.entity';
import { UserRepository } from 'src/domain/auth/repositories/user.repository';

@Injectable()
export class BrandService {
    constructor(
        private brandRepository: BrandRepository,
        private userRepository: UserRepository,
    ) { }

    public async create(requestDto: CreateBrandRequestDto): Promise<Result<BaseResponseDto>> {
        if (requestDto.user.role !== RoleTypes.Owner) {
            return new ErrorResult("NOT_AUTHORIZED");
        }

        const brandCheck = await this.brandRepository.findUserWithRoleAndId(requestDto.user.id, RoleTypes.Owner);
        if (brandCheck) {
            return new ErrorResult("BRAND_ALREADY_EXISTS");
        }

        const brand = new Brand();
        brand.name = requestDto.name;
        const newBrand = await this.brandRepository.createBrand(brand);

        await this.userRepository.updateBrandIdForUser(requestDto.user.id, newBrand.id);;

        return new SuccessResult();
    }

    public async update(requestDto: CreateBrandRequestDto): Promise<Result<BaseResponseDto>> {
        if (requestDto.user.role !== RoleTypes.Owner) {
            return new ErrorResult("NOT_AUTHORIZED");
        }

        const brandCheck = await this.brandRepository.findUserWithRoleAndId(requestDto.user.id, RoleTypes.Owner);
        if (!brandCheck) {
            return new ErrorResult("BRAND_NOT_FOUND");
        }

        const brand = new Brand();
        brand.name = requestDto.name;
        await this.brandRepository.updateBrand({ id: brandCheck.brand_id }, brand);

        return new SuccessResult();
    }
}
