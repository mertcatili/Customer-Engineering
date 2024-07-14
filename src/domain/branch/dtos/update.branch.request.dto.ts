import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator";
import BaseRequestDto from "src/application/dtos/base.request.dto";
import CreateBranchRequestDto from "./create.branch.request.dto";


export default class UpdateBranchRequestDto extends CreateBranchRequestDto {
	@IsString()
	branch_id: string = "";
}
