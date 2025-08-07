import express, { Express } from "express";
import UserController from "../controller/user"
import { errorWrapper } from "../utils/error";
import { AuthenticationCheck, AuthorizationCheck } from "../utils/auth";

const app: Express = express();

app.get('/', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(UserController.Get))
app.get('/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(UserController.GetById))
app.put('/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(UserController.UpdateById))
app.delete('/:id', errorWrapper(AuthenticationCheck), errorWrapper(AuthorizationCheck), errorWrapper(UserController.RemoveById))

export default app