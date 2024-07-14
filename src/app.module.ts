import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from "@nestjs/core";
import { AuthModule } from './auth.module';
import { typeOrmConfig } from './infrastructure/config/typeorm.config';
import { AppController } from './application/controllers/app.controller';
import { AppService } from './application/services/app.service';
import { BranchModule } from './branch.module';
import AuthenticationModule from './authentication.module';
import { BrandModule } from './brand.module';
import ExceptionHandler from './shared/middleware/exception.middleware';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }), TypeOrmModule.forRoot(typeOrmConfig), AuthenticationModule, BranchModule, AuthModule, BrandModule],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_FILTER,
        useClass: ExceptionHandler,
    }, ExceptionHandler],
})
export class AppModule { }
