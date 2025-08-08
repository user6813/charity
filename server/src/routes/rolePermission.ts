import express, { Express } from "express";
import RolePermissionController from "../controller/rolePermission"
import { errorWrapper } from "../utils/error";
import { AuthenticationCheck, AuthorizationCheck } from "../utils/auth";

const app: Express = express();

app.get('/:roleId', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(RolePermissionController.Get))
app.put('/:roleId', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(RolePermissionController.UpdateById))

export default app