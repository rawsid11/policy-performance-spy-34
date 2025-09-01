import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ChartCard } from '../ChartCard';
import { productContribution } from '@/data/mockData';

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--teal))',
  'hsl(var(--muted-foreground))'
];

export function ProductContributionChart() {
  return (
    <ChartCard 
      title="Product Contribution" 
      description="Revenue contribution by product type"
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={productContribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ product, contribution }) => `${product}: ${contribution}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="contribution"
            >
              {productContribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value, name, entry) => [
                `₹${(entry.payload.amount / 1000000).toFixed(1)}M (${value}%)`,
                'Contribution'
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}