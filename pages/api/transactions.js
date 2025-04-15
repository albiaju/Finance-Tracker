import connectDB from '../../lib/mongodb'; // Import the MongoDB connection
import Transaction from '../../models/Transaction'; // Import the Transaction model

export default async function handler(req, res) {
  await connectDB(); // Ensure the database is connected

  if (req.method === 'GET') {
    try {
      const transactions = await Transaction.find().populate('category'); // Populate category details
      res.status(200).json(transactions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}