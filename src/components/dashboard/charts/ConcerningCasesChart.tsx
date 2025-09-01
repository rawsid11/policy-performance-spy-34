import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ChartCard } from '../ChartCard';
import { concerningCases } from '@/data/mockData';

export function ConcerningCasesChart() {
  return (
    <ChartCard 
      title="Concerning Cases Analysis" 
      description="High-risk policies with claims/withdrawals but zero collections"
      variant="primary"
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={concerningCases} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
            <XAxis 
              dataKey="product" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value, name) => {
                if (name === 'cases') return [value, 'Concerning Cases'];
                if (name === 'potentialLoss') return [`₹${(Number(value) / 1000000).toFixed(2)}M`, 'Potential Loss'];
                return [value, name];
              }}
            />
            <Bar 
              dataKey="cases" 
              fill="hsl(var(--destructive))" 
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}