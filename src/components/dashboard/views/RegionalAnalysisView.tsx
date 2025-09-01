import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "../ChartCard";
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { regionPerformance } from "@/data/mockData";
import { TrendingUp, TrendingDown, MapPin, Building } from "lucide-react";

// Extended regional data with drill-down capabilities
const extendedRegionalData = [
  {
    region: "North",
    branches: 45,
    policies: 3200,
    collectionRate: 94.2,
    collections: 18500000,
    growth: 5.2,
    topBranches: [
      { code: "BR001", name: "Delhi Central", policies: 450, rate: 96.8 },
      { code: "BR002", name: "Gurgaon", policies: 380, rate: 95.2 },
      { code: "BR003", name: "Noida", policies: 320, rate: 93.1 }
    ]
  },
  {
    region: "South",
    branches: 38,
    policies: 2800,
    collectionRate: 89.7,
    collections: 15200000,
    growth: -2.1,
    topBranches: [
      { code: "BR021", name: "Bangalore Tech", policies: 520, rate: 92.4 },
      { code: "BR022", name: "Chennai Port", policies: 410, rate: 88.9 },
      { code: "BR023", name: "Hyderabad IT", policies: 365, rate: 87.2 }
    ]
  },
  {
    region: "East",
    branches: 42,
    policies: 3500,
    collectionRate: 87.3,
    collections: 19800000,
    growth: 3.8,
    topBranches: [
      { code: "BR041", name: "Kolkata Commercial", policies: 485, rate: 89.7 },
      { code: "BR042", name: "Bhubaneswar", policies: 425, rate: 88.1 },
      { code: "BR043", name: "Guwahati", policies: 390, rate: 85.9 }
    ]
  },
  {
    region: "West",
    branches: 51,
    policies: 2400,
    collectionRate: 92.8,
    collections: 12400000,
    growth: 7.3,
    topBranches: [
      { code: "BR061", name: "Mumbai Central", policies: 680, rate: 95.1 },
      { code: "BR062", name: "Pune Tech Park", policies: 445, rate: 93.8 },
      { code: "BR063", name: "Ahmedabad", policies: 385, rate: 90.2 }
    ]
  },
  {
    region: "Central",
    branches: 28,
    policies: 947,
    collectionRate: 86.1,
    collections: 8500000,
    growth: -1.5,
    topBranches: [
      { code: "BR081", name: "Indore", policies: 285, rate: 88.4 },
      { code: "BR082", name: "Bhopal", policies: 245, rate: 85.1 },
      { code: "BR083", name: "Nagpur", policies: 220, rate: 84.7 }
    ]
  }
];

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))', 
  'hsl(var(--accent))',
  'hsl(var(--teal))',
  'hsl(var(--muted-foreground))'
];

export function RegionalAnalysisView() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(selectedRegion === region ? null : region);
  };

  const selectedRegionData = extendedRegionalData.find(r => r.region === selectedRegion);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Regional Analysis</h2>
        <p className="text-muted-foreground">
          Geographic performance breakdown with branch-level drill-down
        </p>
      </div>

      {/* Regional Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {extendedRegionalData.map((region, index) => (
          <Card
            key={region.region}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedRegion === region.region ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => handleRegionClick(region.region)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: COLORS[index] }} />
                {region.region}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{region.collectionRate}%</div>
                <div className="text-xs text-muted-foreground">
                  {region.policies.toLocaleString()} policies
                </div>
                <div className="flex items-center gap-1">
                  {region.growth > 0 ? (
                    <TrendingUp className="w-3 h-3 text-teal" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  <span className={`text-xs ${region.growth > 0 ? 'text-teal' : 'text-destructive'}`}>
                    {region.growth > 0 ? '+' : ''}{region.growth}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Regional Performance Chart */}
      <ChartCard 
        title="Regional Collection Rates Comparison" 
        description="Click on regions above to drill down into branch details"
        variant="primary"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={regionPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="region" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
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
                  if (name === 'collectionRate') return [`${value}%`, 'Collection Rate'];
                  if (name === 'policies') return [Number(value).toLocaleString(), 'Total Policies'];
                  return [value, name];
                }}
              />
              <Bar 
                yAxisId="left" 
                dataKey="collectionRate" 
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              >
                {regionPerformance.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={selectedRegion === entry.region ? 'hsl(var(--primary))' : COLORS[index % COLORS.length]}
                    onClick={() => handleRegionClick(entry.region)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Bar>
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="policies" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Branch Drill-down */}
      {selectedRegionData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              {selectedRegion} Region - Top Performing Branches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {selectedRegionData.branches}
                </div>
                <div className="text-sm text-muted-foreground">Total Branches</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-teal">
                  ₹{(selectedRegionData.collections / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-muted-foreground">Total Collections</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-accent">
                  {selectedRegionData.collectionRate}%
                </div>
                <div className="text-sm text-muted-foreground">Avg Collection Rate</div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Branch Code</TableHead>
                  <TableHead>Branch Name</TableHead>
                  <TableHead>Total Policies</TableHead>
                  <TableHead>Collection Rate</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedRegionData.topBranches.map((branch) => (
                  <TableRow key={branch.code}>
                    <TableCell className="font-medium">{branch.code}</TableCell>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.policies.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{branch.rate}%</span>
                        {branch.rate > selectedRegionData.collectionRate ? (
                          <Badge variant="default" className="bg-teal text-teal-foreground">
                            Above Avg
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            Below Avg
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}