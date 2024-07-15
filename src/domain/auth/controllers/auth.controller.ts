import { Body, Controller, Post } from '@nestjs/common';
import { Result, SuccessResult } from '../../../shared/utils/Result';
import { AuthService } from '../services/auth.service';
import RegisterRequestDto from '../dtos/register.request.dto';
import Validator from '../../../shared/decorators/validation.decorator' //'../../../shared/decorators/validation.decorator';
import LoginRequestDto from '../dtos/login.request.dto';
import AuthResponseDto from '../dtos/auth.response.dto';
import AddEmployeeRequestDto from '../dtos/add.employee.request.dto';
import AddEmployeeResponseDto from '../dtos/add.employee.response.dto';
import BaseResponseDto from '../../../application/dtos/base.response.dto' //'src/application/dtos/base.response.dto';
import { RoleTypes } from '../../../infrastructure/enums/Enums';
import Authorization from '../../../shared/decorators/authorization.decorator';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("register")
    @Validator(RegisterRequestDto)
    public async register(@Body() requestDto: RegisterRequestDto): Promise<Result<BaseResponseDto>> {
        const response = await this.authService.register(requestDto);

        return response;
    }

    @Post("login")
    @Validator(LoginRequestDto)
    public async login(@Body() requestDto: LoginRequestDto): Promise<Result<AuthResponseDto>> {
        const response = await this.authService.login(requestDto);
        
        return response;
    }

    @Post("addEmployee")
    @Validator(AddEmployeeRequestDto)
    @Authorization( [RoleTypes.Owner] )
    public async addEmployee(@Body() requestDto: AddEmployeeRequestDto): Promise<Result<AddEmployeeResponseDto>> {
        const response = await this.authService.addEmployee(requestDto);
        
        return response;
    }
}
