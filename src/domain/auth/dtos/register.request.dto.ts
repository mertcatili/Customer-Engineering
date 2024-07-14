import { IsString } from "@nestjs/class-validator";


export default class RegisterRequestDto {
	@IsString()
	name: string = "";

    @IsString()
	surname: string = "";

    @IsString()
    email: string = "";

    @IsString()
    password: string = "";
}
