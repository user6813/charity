import express, { Express } from "express";
import RoleController from "../controller/role"
import { errorWrapper } from "../utils/error";
import { CreateRoleValidate, UpdateRoleValidate } from "../validate/role";
import { AuthenticationCheck, AuthorizationCheck } from "../utils/auth";

const app: Express = express();

app.get('/', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(RoleController.Get))
app.get('/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(RoleController.GetById))
app.post('/', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(CreateRoleValidate), errorWrapper(RoleController.Add))
app.put('/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(UpdateRoleValidate), errorWrapper(RoleController.UpdateById))
app.delete('/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(RoleController.RemoveById))
app.put('/restore/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(RoleController.RestoreById))

export default app