import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ChartCard } from '../ChartCard';
import { channelPerformance } from '@/data/mockData';

export function ChannelPerformanceChart() {
  return (
    <ChartCard 
      title="Channel Performance Score" 
      description="Composite metric combining collection efficiency and scale"
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={channelPerformance}>
            <PolarGrid stroke="hsl(var(--chart-grid))" />
            <PolarAngleAxis 
              dataKey="channel" 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <PolarRadiusAxis 
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Radar
              name="Performance Score"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value) => [`${value}`, 'Performance Score']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}