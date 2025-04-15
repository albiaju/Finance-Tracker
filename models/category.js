import mongoose from 'mongoose';

// Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'], // Specify if the category is for income or expense
    required: true
  }
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

// Export the Category model
export default Category;