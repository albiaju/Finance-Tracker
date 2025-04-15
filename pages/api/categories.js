import connectDB from '../../lib/mongodb'; // Import the MongoDB connection
import Category from '../../models/category'; // Import the Category model

export default async function handler(req, res) {
  await connectDB(); // Ensure the database is connected

  if (req.method === 'POST') {
    const { name, type } = req.body;
    try {
      const newCategory = new Category({ name, type });
      await newCategory.save();
      res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create category" });
    }
  } else if (req.method === 'GET') {
    try {
      const categories = await Category.find(); // Retrieve all categories
      res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}