import { contract, web3, contractAddress } from "../contract/contract"
import { GlobalResponse } from "../types/global"

const getCampaigns = async ({from}: {from: string}): Promise<GlobalResponse> => {
    const campaigns = await contract.methods.getAllActiveCampaigns().call({from})
    const totalDonations = await contract.methods.totalDonations().call({from})
    return { success: true, data: { totalDonations: String(totalDonations)} }
}

const createCampaign = async (body: {title: string, description: string, goal: number, durationInDays: number},
    {from}: {from: string}): Promise<GlobalResponse> => {
    const result = await contract.methods.createCampaign(body.title, body.description, from, body.goal, body.durationInDays).send({from, gas: "3000000"})
    return { success: true }
}

const donateToCampaign = async (
    { campaignId, amountInEth }: { campaignId: number; amountInEth: string },
    { from }: { from: string }
  ): Promise<GlobalResponse> => {
    try {
      console.log("Donating", amountInEth, "ETH to campaign", campaignId, "from", from);
  
      const amountInWei = web3.utils.toWei(amountInEth, "ether");
  
      await contract.methods
        .donate(campaignId)
        .send({ from, value: amountInWei, gas: "500000" });
  
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Donation failed" };
    }
  };


const withdrawFunds = async (campaignId: number, fromAddress: string, privateKey: string): Promise<GlobalResponse> => {
    try {
      // Prepare transaction
      const txData = await contract.methods.withdrawFunds(campaignId).send({
        from: fromAddress,
        gas: "200000"
      }).then((txData) => txData.transactionHash);
  
      const tx = {
        from: fromAddress,
        to: contractAddress,
        gas: 200000, // Adjust based on your contract
        data: txData
      };
  
      // Sign transaction
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  
      // Send transaction
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      console.log("Funds withdrawn:", receipt.transactionHash);
      return { success: true };
    } catch (err: any) {
      console.error("Error withdrawing funds:", err);
      return { success: false, error: err.message || "Error withdrawing funds" };
    }
  }

export default {
    getCampaigns,
    createCampaign,
    donateToCampaign,
    withdrawFunds
}
    