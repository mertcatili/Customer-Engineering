import {
	Module, NestModule, MiddlewareConsumer,
} from "@nestjs/common";
import AuthMiddleware from "./shared/middleware/authentication.middleware";
import LogModule from "./log.module";

@Module({
	imports: [LogModule],
})
export default class AuthenticationModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.forRoutes("*");
	}
}
