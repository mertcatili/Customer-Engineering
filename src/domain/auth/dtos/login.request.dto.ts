import { IsString } from "@nestjs/class-validator";


export default class LoginRequestDto {
    @IsString()
    email: string = "";

    @IsString()
    password: string = "";
}
