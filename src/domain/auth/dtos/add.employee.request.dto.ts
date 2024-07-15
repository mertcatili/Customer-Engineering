import { IsString } from "@nestjs/class-validator";
import BaseRequestDto from "../../../application/dtos/base.request.dto";


export default class AddEmployeeRequestDto extends BaseRequestDto {
	@IsString()
	name: string = "";

    @IsString()
	surname: string = "";

    @IsString()
    email: string = "";
}
