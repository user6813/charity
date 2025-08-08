import express, { Express } from "express";
import PermissionController from "../controller/permission"
import { errorWrapper } from "../utils/error";
import { CreatePermissionValidate, UpdatePermissionValidate } from "../validate/permission";
import { AuthenticationCheck, AuthorizationCheck } from "../utils/auth";

const app: Express = express();

app.get('/', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(PermissionController.Get))
app.get('/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(PermissionController.GetById))
app.post('/', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(CreatePermissionValidate), errorWrapper(PermissionController.Add))
app.put('/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(UpdatePermissionValidate), errorWrapper(PermissionController.UpdateById))
app.delete('/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(PermissionController.RemoveById))
app.put('/restore/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(PermissionController.RestoreById))

export default app