import { IsNotEmpty, IsString } from "class-validator";
import { PermissionCreationAttributes } from "../models/permission";

export class PermissionDto implements PermissionCreationAttributes {
    @IsString()
    @IsNotEmpty({ message: "Action is required" })
    action: string = "";

    @IsString()
    @IsNotEmpty({ message: "Base URL is required" })
    baseUrl: string = "";

    @IsString()
    @IsNotEmpty({ message: "Method is required" })
    method: string = "";

    @IsString()
    @IsNotEmpty({ message: "Path is required" })
    path: string = "";
}


export class UpdatePermissionDto implements Partial<PermissionDto> {

}