import { Body, Controller, Post } from '@nestjs/common';
import { Result } from 'src/shared/utils/Result';
import Validator from 'src/shared/decorators/validation.decorator';
import BaseResponseDto from 'src/application/dtos/base.response.dto';
import CreateBranchRequestDto from '../dtos/create.branch.request.dto';
import { BranchService } from '../services/branch.service';
import UpdateBranchRequestDto from '../dtos/update.branch.request.dto';
import BaseRequestDto from 'src/application/dtos/base.request.dto';
import Authorization from 'src/shared/decorators/authorization.decorator';
import { RoleTypes } from 'src/infrastructure/enums/Enums';

@Controller("branch")
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @Post("create")
    @Validator(CreateBranchRequestDto)
    @Authorization( [RoleTypes.Owner] )
    public async create(@Body() requestDto: CreateBranchRequestDto): Promise<Result<BaseResponseDto>> {
        const response = await this.branchService.create(requestDto);

        return response;
    }

    @Post("update")
    @Validator(UpdateBranchRequestDto)
    @Authorization( [RoleTypes.Owner] )
    public async update(@Body() requestDto: UpdateBranchRequestDto): Promise<Result<BaseResponseDto>> {
        const response = await this.branchService.update(requestDto);

        return response;
    }

    @Post("list")
    @Validator(BaseRequestDto)
    @Authorization( [RoleTypes.Owner, RoleTypes.Employee] )
    public async list(@Body() requestDto: BaseRequestDto): Promise<Result<BaseResponseDto>> {
        const response = await this.branchService.list(requestDto);

        return response;
    }
}
