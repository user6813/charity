import express, { Express } from "express";
import AuthController from "../controller/auth";
import { errorWrapper } from "../utils/error";
import { CreateUserValidate } from "../validate/user";
import { AuthenticationCheck } from "../utils/auth";

const app: Express = express();

app.post('/signup', errorWrapper(CreateUserValidate), errorWrapper(AuthController.Signup));
app.post('/login', errorWrapper(AuthController.Login));
app.post('/logout', errorWrapper(AuthenticationCheck), () => { })
app.get('/me', errorWrapper(AuthenticationCheck), () => { })
app.post('/password/reset', errorWrapper(AuthenticationCheck), () => { })

export default app