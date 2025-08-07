import express, { Express } from "express";
import dotenv from "dotenv";
import Router from './routes/index'
import DbConnect from "./config/dbConnect";
import morgan from 'morgan'
import { errorHandler, errorRouteHandler } from "./utils/error";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swaggers";
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

DbConnect()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use("/api",Router);
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(errorRouteHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});