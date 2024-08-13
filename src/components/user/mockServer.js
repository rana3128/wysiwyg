
export const mockFetchSeriesData = (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startTime = new Date('2024-08-01T00:00:00Z');
      const dataSize = 20; // Generating data for 24 hours with 1-minute intervals
      const mockData = [];

      for (let i = 0; i < dataSize; i++) {
        const timeFrom = new Date(startTime.getTime() + i * 60000).toISOString();
        const timeTo = new Date(startTime.getTime() + (i + 1) * 60000).toISOString();
        const count = Math.floor(Math.random() * 200); // Random count between 0 and 199
        mockData.push({ time_from: timeFrom, time_to: timeTo, count: count });
      }

      resolve(mockData);
    }, 500);
  });
};

export const mockFetchTableData = async (source) => {
  // Function to generate a random number within a range
  const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

  // Function to generate random table data
  const generateRandomData = () => {
    const desserts = [
      "Frozen yoghurt",
      "Ice cream sandwich",
      "Eclair",
      "Cupcake",
      "Gingerbread",
      "Brownie",
      "Cheesecake",
      "Pudding",
      "Apple Pie",
      "Donut"
    ];

    const headers = [
      { id: 'name', label: 'Dessert (100g serving)' },
      { id: 'calories', label: 'Calories' },
      { id: 'fat', label: 'Fat (g)' },
      { id: 'carbs', label: 'Carbs (g)' },
      { id: 'protein', label: 'Protein (g)' }
    ];

    const rows = Array.from({ length: 5 }, () => ({
      name: desserts[Math.floor(Math.random() * desserts.length)],
      calories: Math.round(getRandomNumber(150, 400)),
      fat: getRandomNumber(3, 20).toFixed(1),
      carbs: Math.round(getRandomNumber(20, 70)),
      protein: getRandomNumber(2, 10).toFixed(1),
    }));

    return { headers, rows };
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      const randomData = generateRandomData();
      resolve(randomData);
    }, 1000);
  });
};


