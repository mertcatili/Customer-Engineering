import { IsNumber, IsString } from "@nestjs/class-validator";
import UserDto from "../../domain/auth/dtos/user.dto";


export default class BaseRequestDto {
	@IsString()
	token: string = "";

	@IsNumber()
	timezone: number = 0;

	@IsString()
	ipAddress: string = "";

	user: UserDto;
}
