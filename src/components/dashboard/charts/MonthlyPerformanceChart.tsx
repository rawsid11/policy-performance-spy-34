import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { ChartCard } from '../ChartCard';
import { monthlyTrends } from '@/data/mockData';

export function MonthlyPerformanceChart() {
  // Custom tooltip to format the data nicely
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border/50 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-foreground mb-2">{`Month: ${label}`}</p>
          {payload.map((entry: any, index: number) => {
            const value = entry.value;
            const formattedValue = `₹${(value / 1000000).toFixed(1)}M`;
            
            if (entry.dataKey === 'totalDue') {
              return (
                <p key={index} className="text-blue-600">
                  <span className="inline-block w-3 h-3 rounded mr-2" style={{backgroundColor: entry.color}}></span>
                  {`Total RP Due: ${formattedValue}`}
                </p>
              );
            }
            if (entry.dataKey === 'collections') {
              return (
                <p key={index} className="text-green-600">
                  <span className="inline-block w-3 h-3 rounded mr-2" style={{backgroundColor: entry.color}}></span>
                  {`Actual Collection: ${formattedValue}`}
                </p>
              );
            }
            if (entry.dataKey === 'forecastedCollection') {
              return (
                <p key={index} className="text-orange-600">
                  <span className="inline-block w-3 h-3 rounded mr-2" style={{backgroundColor: entry.color}}></span>
                  {`Forecasted: ${formattedValue}`}
                </p>
              );
            }
            return null;
          })}
          
          {/* Calculate collection efficiency */}
          {payload.find((p: any) => p.dataKey === 'collections') && payload.find((p: any) => p.dataKey === 'totalDue') && (
            <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/20">
              Collection Rate: {((payload.find((p: any) => p.dataKey === 'collections')?.value || 0) / 
                               (payload.find((p: any) => p.dataKey === 'totalDue')?.value || 1) * 100).toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard 
      title="Monthly Performance Analysis" 
      description="RP Due, Collections, and Forecasted amounts with trend analysis"
      variant="primary"
    >
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted/10 rounded-lg">
          <div className="text-sm font-medium text-muted-foreground">Current Month</div>
          <div className="text-lg font-bold text-primary">
            ₹{((monthlyTrends[monthlyTrends.length - 2]?.collections || 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-muted-foreground">Collections</div>
        </div>
        <div className="text-center p-3 bg-muted/10 rounded-lg">
          <div className="text-sm font-medium text-muted-foreground">Collection Gap</div>
          <div className="text-lg font-bold text-destructive">
            ₹{(((monthlyTrends[monthlyTrends.length - 2]?.totalDue || 0) - (monthlyTrends[monthlyTrends.length - 2]?.collections || 0)) / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-muted-foreground">Potential Loss</div>
        </div>
        <div className="text-center p-3 bg-muted/10 rounded-lg">
          <div className="text-sm font-medium text-muted-foreground">Next Month Forecast</div>
          <div className="text-lg font-bold text-accent">
            ₹{((monthlyTrends[monthlyTrends.length - 1]?.forecastedCollection || 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-muted-foreground">Expected</div>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={monthlyTrends} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `₹${(value / 1000000).toFixed(0)}M`}
              axisLine={false}
              tickLine={false}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="rect"
              wrapperStyle={{
                paddingBottom: '20px',
                fontSize: '12px'
              }}
            />
            
            {/* Total Due Amount - Light blue bars */}
            <Bar 
              dataKey="totalDue" 
              name="Total RP Due"
              fill="hsl(220 70% 85%)" 
              radius={[4, 4, 0, 0]}
            />
            
            {/* Actual Collections - Green bars */}
            <Bar 
              dataKey="collections" 
              name="Actual Collection"
              fill="hsl(140 70% 55%)" 
              radius={[4, 4, 0, 0]}
            />
            
            {/* Forecasted Collections - Orange dotted line */}
            <Line 
              type="monotone" 
              dataKey="forecastedCollection" 
              name="Forecasted Collection"
              stroke="hsl(30 90% 60%)" 
              strokeWidth={3}
              strokeDasharray="8 4"
              dot={{ 
                fill: 'hsl(30 90% 60%)', 
                strokeWidth: 2, 
                r: 6,
                stroke: 'hsl(var(--background))'
              }}
              activeDot={{ 
                r: 8, 
                fill: 'hsl(30 90% 60%)',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Section */}
      <div className="mt-4 p-4 bg-muted/5 rounded-lg border border-border/20">
        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          📊 Performance Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-primary">Collection Efficiency:</span>
            <p className="text-muted-foreground mt-1">
              Average collection rate of {((monthlyTrends.slice(0, -1).reduce((acc, month) => acc + (month.collections / month.totalDue), 0) / (monthlyTrends.length - 1)) * 100).toFixed(1)}% 
              over the past {monthlyTrends.length - 1} months.
            </p>
          </div>
          <div>
            <span className="font-medium text-accent">Forecast Accuracy:</span>
            <p className="text-muted-foreground mt-1">
              Forecasting model shows strong predictive capability with minimal variance from actual collections.
            </p>
          </div>
        </div>
      </div>
    </ChartCard>
  );
}