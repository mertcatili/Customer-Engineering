import { IsString } from "@nestjs/class-validator";
import BaseRequestDto from "../../../application/dtos/base.request.dto";


export default class CreateBrandRequestDto extends BaseRequestDto {
	@IsString()
	name: string = "";
}
