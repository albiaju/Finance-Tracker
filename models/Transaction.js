import mongoose from 'mongoose';

const { Schema, model } = mongoose; // Destructure Schema and model from mongoose

const TransactionSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
});

// Ensure model is only created once
const Transaction = mongoose.models.Transaction || model('Transaction', TransactionSchema);

export default Transaction;