import express, { Express } from "express";
import AuthRoute from "./auth"
import UserRoute from "./user"
import Permission from './permission'
import Role from './role'
import RolePermission from './rolePermission'

const app: Express = express();

app.use('/health-check', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is up and running',
    timestamp: new Date().toISOString(),
  });
})

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/permission',Permission)
app.use('/role',Role)
app.use('/role-permission',RolePermission)




export default app
