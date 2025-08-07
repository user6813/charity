import { IsEmail, IsNotEmpty, IsNumber, Length, Min } from "class-validator";
import { UserCreationAttributes } from "../models/user";
import { Transform } from "class-transformer";

export class UserDto implements UserCreationAttributes {
    @IsNotEmpty({ message: "First name is required" })
    @Length(2, 30, { message: "First name must be between 2 and 30 characters" })
    @Transform(({ value }) => value) // Ensure null/undefined uses default value
    firstName: string = "";

    @IsNotEmpty({ message: "Last name is required" })
    @Length(2, 30, { message: "Last name must be between 2 and 30 characters" })
    @Transform(({ value }) => value)
    lastName: string = "";

    @IsEmail({}, { message: "Invalid email format" })
    @Transform(({ value }) => value)
    email: string = "";

    @IsNotEmpty({ message: "Password is required" })
    @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
    @Transform(({ value }) => value)
    password: string = "";

    @IsNotEmpty({ message: "Entity name is required" })
    @Length(3, 50, { message: "Entity name must be between 3 and 50 characters" })
    entityName: string = "";

    @IsNotEmpty({ message: "Entity description is required" })
    @Length(10, 500, { message: "Entity description must be between 10 and 500 characters" })
    @Transform(({ value }) => value)
    entityDescription: string = "";

    @IsNumber()
    @Min(0, { message: "Interest rate must be a positive number" })
    @Transform(({ value }) => parseFloat(value))
    interestRate: number = 0;

    @IsNumber()
    @Min(0, { message: "Credit limit must be a positive number" })
    @Transform(({ value }) => parseFloat(value))
    creditLimit: number = 0;

    @IsNumber()
    @Min(0, { message: "Term cap must be a positive number" })
    @Transform(({ value }) => parseFloat(value))
    termCap: number = 0;
}
