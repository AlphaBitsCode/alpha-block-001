
import React from 'react';
import { LineChart as LineChartIcon } from 'lucide-react';
import TelemetryWidget from "./TelemetryWidget";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
      className="min-h-[250px]"
    >
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <XAxis 
              dataKey="time" 
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }} 
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            />
            <YAxis 
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }} 
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                color: 'white'
              }}
              labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
              itemStyle={{ color: 'rgba(255, 255, 255, 0.9)' }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#ef4444" 
              strokeWidth={2} 
              dot={{ fill: '#ef4444', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, stroke: '#ef4444', strokeWidth: 1 }}
            />
            <Line 
              type="monotone" 
              dataKey="humidity" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-4 mt-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span className="text-xs text-white/70">Temp</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span className="text-xs text-white/70">Humidity</span>
        </div>
      </div>
    </TelemetryWidget>
  );
};

export default MiniGraph;
