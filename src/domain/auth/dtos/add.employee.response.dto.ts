import { IsString } from "@nestjs/class-validator";

export default class AddEmployeeResponseDto {
	@IsString()
	email: string = "";

    @IsString()
	password: string = "";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
