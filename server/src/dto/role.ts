import { IsNotEmpty, Length } from "class-validator";
import { RoleCreationAttributes } from "../models/role";
import { Transform } from "class-transformer";

export class RoleDto implements RoleCreationAttributes {
    @IsNotEmpty({ message: "First name is required" })
    @Length(2, 30, { message: "First name must be between 2 and 30 characters" })
    @Transform(({ value }) => value) // Ensure null/undefined uses default value
    roleName: string = "";


    @IsNotEmpty({ message: "First name is required" })
    @Length(2, 30, { message: "First name must be between 2 and 30 characters" })
    @Transform(({ value }) => value) // Ensure null/undefined uses default value
    roleDescription: string = "";
}

export class UpdateRoleDto implements Partial<RoleDto> {

}