import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { GlobalResponse } from "../types/global";

export async function ValidateInput<T extends object>(dtoClass: new () => T, data: unknown): Promise<GlobalResponse> {
    const instance = plainToInstance(dtoClass, data as object); // Ensure data is treated as an object
    const errors = await validate(instance);

    if (errors.length > 0) {
        const errorMessages = errors.map(err => ({
            property: err.property,
            constraints: err.constraints
        }))
        return { success: false, error: JSON.stringify(errorMessages), message: 'Validation Error' }
    }else{
        return { success: true, data: instance }
    }
}
