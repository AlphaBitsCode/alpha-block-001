
import React from 'react';
import { LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface DataPoint {
  time: string;
  temperature: number;
  humidity: number;
}

interface MiniGraphProps {
  data: DataPoint[];
}

const MiniGraph: React.FC<MiniGraphProps> = ({ data }) => {
  // Generate more data points for the last 24 hours
  const generatePast24HoursData = () => {
    const now = new Date();
    const result = [];
    
    // Start from 24 hours ago
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      
      // Generate some realistic looking variations
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
  
  // Use provided data or generate more detailed 24-hour data
  const extendedData = data.length > 12 ? data : generatePast24HoursData();
  
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={extendedData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="time" 
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }} 
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            interval="preserveStartEnd"
            minTickGap={50}
            tickFormatter={(value) => value}
          />
          <YAxis 
            yAxisId="temperature"
            orientation="left"
            domain={['dataMin - 2', 'dataMax + 2']}
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }} 
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            label={{ 
              value: '°C', 
              position: 'insideLeft',
              angle: -90,
              style: { textAnchor: 'middle', fill: 'rgba(255, 255, 255, 0.7)' }
            }}
          />
          <YAxis 
            yAxisId="humidity"
            orientation="right"
            domain={['dataMin - 5', 'dataMax + 5']}
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }} 
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            label={{ 
              value: '%', 
              position: 'insideRight',
              angle: -90,
              style: { textAnchor: 'middle', fill: 'rgba(255, 255, 255, 0.7)' }
            }}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.9)', 
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              padding: '10px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
            labelStyle={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'bold' }}
            itemStyle={{ color: 'rgba(255, 255, 255, 1)', padding: '4px 0' }}
            formatter={(value, name) => {
              if (name === 'temperature') return [`${value.toFixed(1)}°C`, 'Temperature'];
              if (name === 'humidity') return [`${value.toFixed(1)}%`, 'Humidity'];
              return [value, name];
            }}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => {
              return <span style={{ color: 'white', fontSize: '12px' }}>
                {value === 'temperature' ? 'Temperature (°C)' : 'Humidity (%)'}
              </span>
            }}
          />
          <Line 
            yAxisId="temperature"
            type="monotone" 
            dataKey="temperature" 
            name="temperature"
            stroke="#ef4444" 
            strokeWidth={2} 
            dot={{ fill: '#ef4444', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 1 }}
            animationDuration={500}
          />
          <Line 
            yAxisId="humidity"
            type="monotone" 
            dataKey="humidity" 
            name="humidity"
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 1 }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniGraph;
