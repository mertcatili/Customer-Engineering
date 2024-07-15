import { RoleTypes } from "../../infrastructure/enums/Enums";
import { ErrorResponseObject } from "../utils/Result";

export default function Authorization(acceptableRoles: RoleTypes[]) {
	return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
		const orig = descriptor.value;
		// eslint-disable-next-line no-param-reassign
		descriptor.value = async function validate(...args: any[]): Promise<any> {
			const { user } = args[0];

            const roleExists = acceptableRoles.includes(user.role);
            if (!roleExists) {
                throw new ErrorResponseObject("PERMISSION_ERROR");
            }

			return orig.apply(this, args);
		};
		return descriptor;
	};
}
