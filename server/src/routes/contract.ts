import express, { Express } from "express";
import { errorWrapper } from "../utils/error";
import ContractController from "../controller/contract";

const app: Express = express();

app.get("/campaigns", errorWrapper(ContractController.GetCampaigns))
app.post("/campaigns", errorWrapper(ContractController.CreateCampaign))
app.post("/donate", errorWrapper(ContractController.DonateToCampaign))
app.post("/withdraw", errorWrapper(ContractController.withdrawFunds))


export default app