import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ChartCard } from '../ChartCard';
import { paymentMechanismSuccess } from '@/data/mockData';

export function PaymentMechanismChart() {
  return (
    <ChartCard 
      title="Payment Mechanism Success" 
      description="Success rates and average collections by payment method"
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={paymentMechanismSuccess} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
            <XAxis 
              dataKey="mechanism" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
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
                if (name === 'successRate') return [`${value}%`, 'Success Rate'];
                if (name === 'avgCollection') return [`₹${value}`, 'Avg Collection'];
                return [value, name];
              }}
            />
            <Bar 
              yAxisId="left" 
              dataKey="successRate" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="avgCollection" 
              stroke="hsl(var(--accent))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}