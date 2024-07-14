import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ExceptionHandler from './shared/middleware/exception.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const exceptionHandler = app.get(ExceptionHandler);
    app.useGlobalFilters(exceptionHandler);
    await app.listen(process.env.PORT || 4444);
}
bootstrap();
