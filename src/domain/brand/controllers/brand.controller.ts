import { Body, Controller, Post } from '@nestjs/common';
import { Result, SuccessResult } from 'src/shared/utils/Result';
import Validator from 'src/shared/decorators/validation.decorator';
import BaseResponseDto from 'src/application/dtos/base.response.dto';
import { BrandService } from '../services/brand.service';
import CreateBrandRequestDto from '../dtos/create.brand.request.dto';
import UpdateBrandRequestDto from '../dtos/update.brand.request.dto';
import Authorization from 'src/shared/decorators/authorization.decorator';
import { RoleTypes } from 'src/infrastructure/enums/Enums';

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