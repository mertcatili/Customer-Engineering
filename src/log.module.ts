import { Global, Module } from "@nestjs/common";
import { Logger } from "./shared/utils/logger";

@Global()
@Module({
	imports: [],
	providers: [Logger],
	exports: [Logger],
})

export default class LogModule { }
