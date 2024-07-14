import {
    IsNumber, IsString,
} from "@nestjs/class-validator";

export default class UserDto {
    @IsString()
    id: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsNumber()
    role: number;

    @IsString()
    email: string;

    @IsString()
    brandId: string;

    constructor(data: any) {
        this.id = data.id;
        this.password = data.password;
        this.name = data.name;
        this.surname = data.surname;
        this.role = data.role;
        this.email = data.email;
        this.brandId = data.brand_id;
    }
}
