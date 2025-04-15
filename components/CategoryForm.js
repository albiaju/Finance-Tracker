import { useState, useEffect } from 'react';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense'); // Default type
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, type }),
    });

    if (response.ok) {
      setName('');
      fetchCategories(); // Refresh the category list
    } else {
      console.error('Failed to create category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit">Add Category</button>
      </form>
      <h3>Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name} ({category.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryForm;