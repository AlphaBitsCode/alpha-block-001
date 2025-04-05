
import React from 'react';
import { LineChart as LineChartIcon } from 'lucide-react';
import TelemetryWidget from "./TelemetryWidget";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DataPoint {
  time: string;
  temperature: number;
  humidity: number;
}

interface MiniGraphProps {
  data: DataPoint[];
}

const MiniGraph: React.FC<MiniGraphProps> = ({ data }) => {
  return (
    <TelemetryWidget
      title="24h Metrics"
      icon={<LineChartIcon size={18} />}
      className="min-h-[300px]"
    >
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }} 
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            />
            <YAxis 
              tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }} 
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
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
                if (name === 'temperature') return [`${value}°C`, 'Temperature'];
                if (name === 'humidity') return [`${value}%`, 'Humidity'];
                return [value, name];
              }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              name="Temperature"
              stroke="#ef4444" 
              strokeWidth={2} 
              dot={{ fill: '#ef4444', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 1 }}
            />
            <Line 
              type="monotone" 
              dataKey="humidity" 
              name="Humidity"
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-8 mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm text-white/90">Temperature (°C)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm text-white/90">Humidity (%)</span>
        </div>
      </div>
    </TelemetryWidget>
  );
};

export default MiniGraph;
