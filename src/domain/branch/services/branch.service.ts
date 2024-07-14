import { Injectable } from '@nestjs/common';
import { ErrorResult, Result, SuccessResult } from 'src/shared/utils/Result';
import BaseResponseDto from 'src/application/dtos/base.response.dto';
import { RoleTypes } from 'src/infrastructure/enums/Enums';
import { BranchRepository } from '../repositories/branch.repository';
import CreateBranchRequestDto from '../dtos/create.branch.request.dto';
import { UserRepository } from 'src/domain/auth/repositories/user.repository';
import { Branch } from '../entities/branch.entity';
import UpdateBranchRequestDto from '../dtos/update.branch.request.dto';
import BaseRequestDto from 'src/application/dtos/base.request.dto';

const h3 = require('h3-js');

@Injectable()
export class BranchService {
    constructor(
        private branchRepository: BranchRepository,
        private userRepository: UserRepository,
    ) { }

    public async create(requestDto: CreateBranchRequestDto): Promise<Result<BaseResponseDto>> {
        const owner = await this.userRepository.findOneById(requestDto.user.id);
        if (!owner) {
            return new ErrorResult("USER_NOT_FOUND");
        }

        if (!owner.brand_id) {
            return new ErrorResult("OWNER_HAS_NO_BRAND");
        }

        const branch = new Branch();
        branch.name = requestDto.name;
        branch.brand_id = owner.brand_id;
        branch.is_active = requestDto.isActive;
        branch.created_at = new Date();
        branch.full_address = requestDto.fullAddress;
        branch.latitude = requestDto.latitude;
        branch.longitude = requestDto.longitude;
        branch.phone = requestDto.phone;
        branch.location = h3.latLngToCell(parseFloat(requestDto.latitude), parseFloat(requestDto.longitude), 15); //convert lat long to h3 cell
        await this.branchRepository.createBranch(branch);

        return new SuccessResult();
    }

    public async update(requestDto: UpdateBranchRequestDto): Promise<Result<BaseResponseDto>> {
        const owner = await this.userRepository.findOneById(requestDto.user.id);
        if (!owner) {
            return new ErrorResult("USER_NOT_FOUND");
        }

        if (!owner.brand_id) {
            return new ErrorResult("OWNER_HAS_NO_BRAND");
        }

        const branchCheck = await this.branchRepository.findBranchByBrandId(requestDto.branch_id);
        if (!branchCheck) {
            return new ErrorResult("BRANCH_NOT_FOUND");
        }

        if (owner.brand_id !== branchCheck.brand_id) {
            return new ErrorResult("BRANCH_NOT_FOUND");
        }

        const branch = new Branch();
        branch.name = requestDto.name;
        branch.is_active = requestDto.isActive;
        branch.full_address = requestDto.fullAddress;
        branch.latitude = requestDto.latitude;
        branch.longitude = requestDto.longitude;
        branch.phone = requestDto.phone;
        branch.location = h3.latLngToCell(parseFloat(requestDto.latitude), parseFloat(requestDto.longitude), 15); //convert lat long to h3 cell
        await this.branchRepository.updateBranch({ id: requestDto.branch_id }, branch);

        return new SuccessResult();
    }

    public async list(requestDto: BaseRequestDto): Promise<Result<BaseResponseDto>> {
        const user = await this.userRepository.findOneById(requestDto.user.id);
        if (!user) {
            return new ErrorResult("USER_NOT_FOUND");
        }

        if (!user.brand_id) {
            return new ErrorResult("OWNER_HAS_NO_BRAND");
        }

        const branches = await this.branchRepository.findBranchesByUserId(user.id);

        return new SuccessResult(branches);
    }
}
