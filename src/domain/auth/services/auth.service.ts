import { Injectable } from '@nestjs/common';
import { ErrorResult, Result, SuccessResult } from 'src/shared/utils/Result';
import RegisterRequestDto from '../dtos/register.request.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import AuthResponseDto from '../dtos/auth.response.dto';
import LoginRequestDto from '../dtos/login.request.dto';
import { RoleTypes } from 'src/infrastructure/enums/Enums';
import { Crypto } from 'src/shared/utils/Crypto';
import AddEmployeeRequestDto from '../dtos/add.employee.request.dto';
import AddEmployeeResponseDto from '../dtos/add.employee.response.dto';
import BaseResponseDto from 'src/application/dtos/base.response.dto';
import { BrandRepository } from 'src/domain/brand/repositories/brand.repository';

const jwt = require('jsonwebtoken');
const uuid = require("uuid");

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private brandRepository: BrandRepository,
        private crypto: Crypto,
    ) { }

    public async register(requestDto: RegisterRequestDto): Promise<Result<BaseResponseDto>> {
        const userCheck = await this.userRepository.findOneByEmail(requestDto.email);
        if (userCheck) {
            return new ErrorResult("USER_ALREADY_EXISTS");
        }

        const user = new User();
        user.email = requestDto.email;
        user.password = await this.crypto.encodeBase64(requestDto.password);
        user.name = requestDto.name;
        user.surname = requestDto.surname;
        user.role = RoleTypes.Owner;
        await this.userRepository.saveUser(user);

        return new SuccessResult();
    }

    public async login(requestDto: LoginRequestDto): Promise<Result<AuthResponseDto>> {
        const user = await this.userRepository.findOneByEmail(requestDto.email);
        if (!user) {
            return new ErrorResult("USER_NOT_FOUND");
        }

        const decodedPassword = await this.crypto.decodeBase64(user.password);
        if (requestDto.password !== decodedPassword) {
            return new ErrorResult("INVALID_PASSWORD");
        }

        const data = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            brandId: user.brand_id ? user.brand_id : null,
        };
        
        const token = jwt.sign({data}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        const response = new AuthResponseDto(token);

        return new SuccessResult(response);
    }

    public async addEmployee(requestDto: AddEmployeeRequestDto): Promise<Result<AddEmployeeResponseDto>> {
        const userCheck = await this.userRepository.findOneByEmail(requestDto.email);
        if (userCheck) {
            return new ErrorResult("USER_ALREADY_EXISTS");
        }

        if (requestDto.user.role !== RoleTypes.Owner) {
            return new ErrorResult("NOT_AUTHORIZED");
        }

        const owner = await this.userRepository.findOneByEmail(requestDto.user.email);
        if (!owner.brand_id) {
            return new ErrorResult("UNKNOWN_BRAND");
        }

        const password = uuid.v4();
        const user = new User();
        user.email = requestDto.email;
        user.password = await this.crypto.encodeBase64(password);
        user.name = requestDto.name;
        user.surname = requestDto.surname;
        user.role = RoleTypes.Employee;
        user.brand_id = owner.brand_id;
        await this.userRepository.saveUser(user);

        const response = new AddEmployeeResponseDto(user.email, password);
        return new SuccessResult(response);
    }
}
