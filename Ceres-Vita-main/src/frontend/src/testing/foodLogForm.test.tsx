import React, { useState } from 'react';

const FoodLogForm = () => {
  const [foodId, setFoodId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const userId = localStorage.getItem('userId'); // Assuming userId is stored after login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/food/log-food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, foodId, quantity }),
    });

    const result = await response.json();
    console.log(result.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="food">Select Food:</label>
      <select id="food" value={foodId} onChange={(e) => setFoodId(e.target.value)}>
        {/* Add food options here dynamically by fetching from backend */}
        <option value="1">Apple</option>
        <option value="2">Banana</option>
        {/* Add more options */}
      </select>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min="1"
      />
      <button type="submit">Log Food</button>
    </form>
  );
};

export default FoodLogForm;
