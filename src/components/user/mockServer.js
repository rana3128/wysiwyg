
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
