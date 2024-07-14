import { Response } from "express";
import {
	ArgumentsHost, Catch, ExceptionFilter,
} from "@nestjs/common";

import { ErrorResponseObject, ErrorResult } from "../utils/Result";
import { Logger } from "../utils/logger";

@Catch()
export default class ExceptionHandler implements ExceptionFilter {
	constructor(private readonly logger: Logger) {
	}

	public catch(exception: ErrorResponseObject, host: ArgumentsHost) {
		const { headers } = host.getArgs()[0];
		const accessToken = headers["x-access-token"] || headers["X-ACCESS-TOKEN"] || "token";

		const error = {
			message: exception.message,
			data: JSON.stringify(exception.data),
		};

		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = 400;

        const errorMessage = exception.message || "UNKNOWN_ERROR";
        this.logger.log(`Error: ${JSON.stringify(error)}, token: ${accessToken}`);
		response
			.status(status)
			.json(new ErrorResult(errorMessage));
	}
}
