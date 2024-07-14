import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator";
import BaseRequestDto from "src/application/dtos/base.request.dto";


export default class CreateBranchRequestDto extends BaseRequestDto {
	@IsString()
	name: string = "";

    @IsBoolean()
    isActive: boolean = false;

    @IsString()
    latitude: string;

    @IsString()
    longitude: string;

    @IsString()
    fullAddress: string;

    @IsString()
    phone: string = "";
}
