import { Body, Controller, Post } from '@nestjs/common';
import { Result, SuccessResult } from '../../../shared/utils/Result';
import BaseResponseDto from '../../../application/dtos/base.response.dto' //'src/application/dtos/base.response.dto';
import { BrandService } from '../services/brand.service';
import CreateBrandRequestDto from '../dtos/create.brand.request.dto';
import UpdateBrandRequestDto from '../dtos/update.brand.request.dto';
import Authorization from '../../../shared/decorators/authorization.decorator';
import { RoleTypes } from '../../../infrastructure/enums/Enums' //'src/infrastructure/enums/Enums';
import Validator from '../../../shared/decorators/validation.decorator' //'../../../shared/decorators/validation.decorator';

@Controller("brand")
export class BrandController {
    constructor(private readonly brandService: BrandService) { }

    @Post("create")
    @Validator(CreateBrandRequestDto)
    @Authorization( [RoleTypes.Owner] )
    public async create(@Body() requestDto: CreateBrandRequestDto): Promise<Result<BaseResponseDto>> {
        const response = await this.brandService.create(requestDto);

        return response;
    }

    @Post("update")
    @Validator(UpdateBrandRequestDto)
    @Authorization( [RoleTypes.Owner] )
    public async update(@Body() requestDto: UpdateBrandRequestDto): Promise<Result<BaseResponseDto>> {
        const response = await this.brandService.update(requestDto);

        return response;
    }
}