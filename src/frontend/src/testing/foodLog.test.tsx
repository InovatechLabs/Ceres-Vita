import { useState, useEffect } from 'react';

const FoodLog = () => {
  const [foodLogs, setFoodLogs] = useState<any[]>([]);
  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    const fetchFoodLogs = async () => {
      const date = new Date().toISOString().split('T')[0]; // Today's date in 'YYYY-MM-DD'
      const response = await fetch(`/api/food/get-food-log/${userId}/${date}`);
      const result = await response.json();
      setFoodLogs(result);
    };

    fetchFoodLogs();
  }, [userId]);

  return (
    <div>
      <h2>Your Food Log for Today</h2>
      <ul>
        {foodLogs.map((log, index) => (
          <li key={index}>
            {log.name}: {log.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodLog;
