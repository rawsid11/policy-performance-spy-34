import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ComposedChart,
  Cell
} from 'recharts';
import { ChartCard } from "../ChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Radio,
  TrendingUp, 
  TrendingDown, 
  Users,
  DollarSign,
  Target,
  Award,
  AlertCircle
} from "lucide-react";

// Enhanced channel analysis data
const channelMetrics = [
  {
    channel: "Direct Sales",
    policies: 4200,
    collections: 22000000,
    collectionRate: 89.5,
    avgDealSize: 5238,
    conversionRate: 24.8,
    customerSat: 4.2,
    growth: 8.5,
    costPerAcquisition: 1250,
    retention: 92.1,
    profitability: 18.5
  },
  {
    channel: "Bancassurance",
    policies: 3800,
    collections: 19500000,
    collectionRate: 87.2,
    avgDealSize: 5132,
    conversionRate: 31.2,
    customerSat: 4.0,
    growth: 5.2,
    costPerAcquisition: 890,
    retention: 89.4,
    profitability: 22.1
  },
  {
    channel: "Broker",
    policies: 2900,
    collections: 14200000,
    collectionRate: 82.4,
    avgDealSize: 4897,
    conversionRate: 18.9,
    customerSat: 3.8,
    growth: 2.1,
    costPerAcquisition: 1450,
    retention: 85.2,
    profitability: 15.8
  },
  {
    channel: "Online",
    policies: 1500,
    collections: 8800000,
    collectionRate: 91.8,
    avgDealSize: 5867,
    conversionRate: 12.4,
    customerSat: 4.3,
    growth: 18.7,
    costPerAcquisition: 650,
    retention: 94.2,
    profitability: 28.9
  },
  {
    channel: "Corporate",
    policies: 447,
    collections: 3900000,
    collectionRate: 76.3,
    avgDealSize: 8724,
    conversionRate: 45.2,
    customerSat: 3.9,
    growth: -4.2,
    costPerAcquisition: 2100,
    retention: 78.9,
    profitability: 12.4
  }
];

// Radar chart data for channel comparison
const radarData = channelMetrics.map(channel => ({
  channel: channel.channel,
  collectionRate: channel.collectionRate,
  conversionRate: channel.conversionRate * 2, // Scale for visibility
  retention: channel.retention,
  customerSat: channel.customerSat * 20, // Scale for visibility
  profitability: channel.profitability * 4 // Scale for visibility
}));

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))', 
  'hsl(var(--accent))',
  'hsl(var(--teal))',
  'hsl(var(--muted-foreground))'
];

export function ChannelAnalysisView() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [activeMetric, setActiveMetric] = useState<string>("collections");

  const handleChannelClick = (channel: string) => {
    setSelectedChannel(selectedChannel === channel ? null : channel);
  };

  const selectedChannelData = channelMetrics.find(c => c.channel === selectedChannel);

  const getPerformanceBadge = (value: number, metric: string) => {
    let threshold = 85; // Default threshold
    if (metric === 'growth') threshold = 5;
    if (metric === 'profitability') threshold = 20;
    if (metric === 'customerSat') threshold = 4.0;

    if (metric === 'growth') {
      if (value > threshold) return { variant: "default" as const, label: "High Growth" };
      if (value > 0) return { variant: "secondary" as const, label: "Moderate Growth" };
      return { variant: "destructive" as const, label: "Declining" };
    }

    if (value > threshold) return { variant: "default" as const, label: "Excellent" };
    if (value > threshold * 0.8) return { variant: "secondary" as const, label: "Good" };
    return { variant: "destructive" as const, label: "Needs Improvement" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Channel Analysis Dashboard</h2>
        <p className="text-muted-foreground">
          Comprehensive performance analysis across all distribution channels
        </p>
      </div>

      {/* Channel Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {channelMetrics.map((channel, index) => (
          <Card
            key={channel.channel}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedChannel === channel.channel ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => handleChannelClick(channel.channel)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Radio className="w-4 h-4" style={{ color: COLORS[index] }} />
                {channel.channel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{channel.collectionRate}%</div>
                <div className="text-xs text-muted-foreground">
                  ₹{(channel.collections / 1000000).toFixed(1)}M
                </div>
                <div className="flex items-center gap-1">
                  {channel.growth > 0 ? (
                    <TrendingUp className="w-3 h-3 text-teal" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  <span className={`text-xs ${channel.growth > 0 ? 'text-teal' : 'text-destructive'}`}>
                    {channel.growth > 0 ? '+' : ''}{channel.growth}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Multi-dimensional Performance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Channel Performance Radar" 
          description="Multi-dimensional performance comparison across key metrics"
          variant="primary"
        >
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
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
                  dataKey="collectionRate"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  dataKey="retention"
                  stroke="hsl(var(--teal))"
                  fill="hsl(var(--teal))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Channel Revenue & Growth Trends */}
        <ChartCard 
          title="Revenue vs Growth Analysis" 
          description="Collection amounts with growth rate trends"
          variant="secondary"
        >
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={channelMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
                <XAxis 
                  dataKey="channel" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
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
                    if (name === 'collections') return [`₹${(Number(value) / 1000000).toFixed(1)}M`, 'Collections'];
                    if (name === 'growth') return [`${value}%`, 'Growth Rate'];
                    return [value, name];
                  }}
                />
                <Bar 
                  yAxisId="left" 
                  dataKey="collections" 
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                >
                  {channelMetrics.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={selectedChannel === entry.channel ? 'hsl(var(--accent))' : COLORS[index % COLORS.length]}
                      onClick={() => handleChannelClick(entry.channel)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Bar>
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="growth" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Efficiency Metrics Comparison */}
      <ChartCard 
        title="Channel Efficiency Metrics" 
        description="Cost per acquisition vs conversion rates across channels"
        variant="secondary"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={channelMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="channel" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
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
                  if (name === 'costPerAcquisition') return [`₹${Number(value).toLocaleString()}`, 'Cost per Acquisition'];
                  if (name === 'conversionRate') return [`${value}%`, 'Conversion Rate'];
                  return [value, name];
                }}
              />
              <Bar 
                yAxisId="left" 
                dataKey="costPerAcquisition" 
                fill="hsl(var(--secondary))"
                opacity={0.7}
                radius={[4, 4, 0, 0]}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="conversionRate" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Detailed Channel Analysis */}
      {selectedChannelData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="w-5 h-5" />
              {selectedChannel} - Detailed Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Performance Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Performance
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Collection Rate</div>
                    <div className="text-2xl font-bold text-primary">
                      {selectedChannelData.collectionRate}%
                    </div>
                    <Badge className="mt-1" {...getPerformanceBadge(selectedChannelData.collectionRate, 'collection')}>
                      {getPerformanceBadge(selectedChannelData.collectionRate, 'collection').label}
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    <div className="text-2xl font-bold text-teal">
                      {selectedChannelData.conversionRate}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Financial
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Collections</div>
                    <div className="text-2xl font-bold text-accent">
                      ₹{(selectedChannelData.collections / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Avg Deal Size</div>
                    <div className="text-2xl font-bold text-secondary">
                      ₹{selectedChannelData.avgDealSize.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Profitability</div>
                    <div className="text-2xl font-bold text-teal">
                      {selectedChannelData.profitability}%
                    </div>
                    <Badge className="mt-1" {...getPerformanceBadge(selectedChannelData.profitability, 'profitability')}>
                      {getPerformanceBadge(selectedChannelData.profitability, 'profitability').label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Customer Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Customer
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Policies</div>
                    <div className="text-2xl font-bold text-primary">
                      {selectedChannelData.policies.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Retention Rate</div>
                    <div className="text-2xl font-bold text-teal">
                      {selectedChannelData.retention}%
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                    <div className="text-2xl font-bold text-accent">
                      {selectedChannelData.customerSat}/5.0
                    </div>
                    <Badge className="mt-1" {...getPerformanceBadge(selectedChannelData.customerSat, 'customerSat')}>
                      {getPerformanceBadge(selectedChannelData.customerSat, 'customerSat').label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Growth & Efficiency */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Growth & Efficiency
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Growth Rate</div>
                    <div className={`text-2xl font-bold ${selectedChannelData.growth > 0 ? 'text-teal' : 'text-destructive'}`}>
                      {selectedChannelData.growth > 0 ? '+' : ''}{selectedChannelData.growth}%
                    </div>
                    <Badge className="mt-1" {...getPerformanceBadge(selectedChannelData.growth, 'growth')}>
                      {getPerformanceBadge(selectedChannelData.growth, 'growth').label}
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Cost per Acquisition</div>
                    <div className="text-2xl font-bold text-secondary">
                      ₹{selectedChannelData.costPerAcquisition.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex gap-2 flex-wrap">
                <Button className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Optimization Plan
                </Button>
                <Button variant="outline">
                  Compare Channels
                </Button>
                <Button variant="outline">
                  Historical Trends
                </Button>
                <Button variant="outline">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Risk Assessment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}