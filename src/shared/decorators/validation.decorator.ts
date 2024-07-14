import { validateOrReject } from "@nestjs/class-validator";
import { plainToClass } from  "@nestjs/class-transformer";
import { ErrorResponseObject } from "../utils/Result";

export default function Validator(type: any) {
	return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
		const orig = descriptor.value;
		// eslint-disable-next-line no-param-reassign
		descriptor.value = async function validate(...args: any[]): Promise<any> {
			console.log(args);
			const dto = plainToClass(type, args[0]);

			console.log(dto);
			await validateOrReject(dto).catch((errors) => {
				throw new ErrorResponseObject("MISSING_PARAMETERS", errors);
			});

			return orig.apply(this, args);
		};
		return descriptor;
	};
}
