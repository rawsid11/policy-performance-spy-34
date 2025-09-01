import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ChartCard } from '../ChartCard';
import { regionPerformance } from '@/data/mockData';

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))', 
  'hsl(var(--accent))',
  'hsl(var(--teal))',
  'hsl(var(--muted-foreground))'
];

export function RegionPerformanceChart() {
  return (
    <ChartCard 
      title="Regional Performance" 
      description="Collection rates by geographic region"
      variant="secondary"
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regionPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
            <XAxis 
              dataKey="region" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
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
                if (name === 'collectionRate') return [`${value}%`, 'Collection Rate'];
                if (name === 'policies') return [Number(value).toLocaleString(), 'Total Policies'];
                if (name === 'collections') return [`₹${(Number(value) / 1000000).toFixed(1)}M`, 'Collections'];
                return [value, name];
              }}
            />
            <Bar dataKey="collectionRate" radius={[4, 4, 0, 0]}>
              {regionPerformance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}