import { initMongoose } from "@/lib/mongoose";
import Transaction from "@/models/Transaction";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {

    try {
        await initMongoose();

        if (req.method === 'POST') {
            const registerTransaction = await Transaction.create(req.body);
            res.status(200).json({ success: true, data: registerTransaction });
        } else if (req.method === 'GET') {
            const getTransactions = await Transaction.find({});
            res.status(200).json({ success: true, data: getTransactions })
        } else {
            throw new Error(`Unsupported HTTP method: ${req.method}.`);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, data: error })
    }

}