import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator";
import CreateBranchRequestDto from "./create.branch.request.dto";


export default class UpdateBranchRequestDto extends CreateBranchRequestDto {
	@IsString()
	branch_id: string = "";
}
