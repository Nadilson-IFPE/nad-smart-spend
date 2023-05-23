import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    datetime: { type: String, require: true },
});

const Transaction = models?.Transaction || model('Transaction', TransactionSchema);

export default Transaction;