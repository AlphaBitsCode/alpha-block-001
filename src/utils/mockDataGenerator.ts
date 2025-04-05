
export interface MockGraphDataPoint {
  time: string;
  temperature: number;
  humidity: number;
}

export interface MockActivityLog {
  id: string;
  message: string;
  timestamp: string;
  type: "info" | "warning" | "error" | "success";
  icon?: React.ReactNode;
}

// Generate 24-hour mock graph data
export const generateMockGraphData = (): MockGraphDataPoint[] => {
  const result = [];
  const now = new Date();
  
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    // Create variations based on time of day
    const tempBase = 28;
    const humidityBase = 82;
    const hourFactor = Math.sin((24-i) * Math.PI / 12); // Day/night cycle
    
    result.push({
      time: timeString,
      temperature: tempBase + hourFactor * 2 + Math.random() * 1.5,
      humidity: humidityBase - hourFactor * 4 + Math.random() * 3
    });
  }
  
  return result;
};
