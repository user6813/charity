import { CustomRequest } from "../types/global";
import httpStatus from "../utils/httpStatus";
import ContractService from "../service/contract";
import { Response } from "express";

const GetCampaigns = async (req: CustomRequest, res: Response): Promise<any> => {
    const { from = '' } = req.query || {}
    const result = await ContractService.getCampaigns({from: String(from)})
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const CreateCampaign = async (req: CustomRequest, res: Response): Promise<any> => {
    const { from = '' } = req.query || {}
    const result = await ContractService.createCampaign(req.body, {from: String(from)})
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const DonateToCampaign = async (req: CustomRequest, res: Response): Promise<any> => {
    const { from = '' } = req.query || {}
    const result = await ContractService.donateToCampaign(req.body, {from: String(from)})
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const withdrawFunds = async (req: CustomRequest, res: Response): Promise<any> => {
    const { campaignId, privateKey } = req.body;
    const { from = '' } = req.query || {}
    const result = await ContractService.withdrawFunds(campaignId, String(from), privateKey);
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
};

export default {
    GetCampaigns,
    CreateCampaign,
    DonateToCampaign,
    withdrawFunds
}
    