import { IsString } from "@nestjs/class-validator";
import BaseRequestDto from "../../../application/dtos/base.request.dto";


export default class UpdateBrandRequestDto extends BaseRequestDto {
	@IsString()
	name: string = "";
}
