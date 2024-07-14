import { IsString } from "@nestjs/class-validator";

export default class AuthResponseDto {
	@IsString()
	token: string = "";

    constructor(token: string) {
        this.token = token;
    }
}
