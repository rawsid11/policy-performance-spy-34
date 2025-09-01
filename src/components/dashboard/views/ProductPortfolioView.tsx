import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell
} from 'recharts';
import { ChartCard } from "../ChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  Eye
} from "lucide-react";

// Extended product data with hierarchical structure
const productHierarchy = [
  {
    name: "Term Life",
    contribution: 32.5,
    amount: 19000000,
    policies: 4200,
    growth: 8.2,
    avgPremium: 4524,
    subProducts: [
      { name: "Basic Term", contribution: 18.5, amount: 11000000, policies: 2500 },
      { name: "Term with Return", contribution: 8.9, amount: 5200000, policies: 950 },
      { name: "Group Term", contribution: 5.1, amount: 2800000, policies: 750 }
    ]
  },
  {
    name: "Whole Life",
    contribution: 28.7,
    amount: 16800000,
    policies: 2100,
    growth: 3.5,
    avgPremium: 8000,
    subProducts: [
      { name: "Traditional Whole Life", contribution: 16.2, amount: 9500000, policies: 1200 },
      { name: "Limited Payment", contribution: 8.1, amount: 4800000, policies: 600 },
      { name: "Single Premium", contribution: 4.4, amount: 2500000, policies: 300 }
    ]
  },
  {
    name: "ULIP",
    contribution: 18.2,
    amount: 10600000,
    policies: 1800,
    growth: -2.3,
    avgPremium: 5889,
    subProducts: [
      { name: "Equity ULIP", contribution: 11.8, amount: 6900000, policies: 1100 },
      { name: "Debt ULIP", contribution: 4.2, amount: 2500000, policies: 450 },
      { name: "Balanced ULIP", contribution: 2.2, amount: 1200000, policies: 250 }
    ]
  },
  {
    name: "Endowment",
    contribution: 12.4,
    amount: 7200000,
    policies: 1600,
    growth: 1.8,
    avgPremium: 4500,
    subProducts: [
      { name: "Money Back", contribution: 7.1, amount: 4200000, policies: 900 },
      { name: "Traditional Endowment", contribution: 3.8, amount: 2200000, policies: 500 },
      { name: "Market Linked", contribution: 1.5, amount: 800000, policies: 200 }
    ]
  },
  {
    name: "Health",
    contribution: 8.2,
    amount: 4800000,
    policies: 2400,
    growth: 12.5,
    avgPremium: 2000,
    subProducts: [
      { name: "Individual Health", contribution: 4.8, amount: 2800000, policies: 1400 },
      { name: "Family Floater", contribution: 2.2, amount: 1300000, policies: 650 },
      { name: "Critical Illness", contribution: 1.2, amount: 700000, policies: 350 }
    ]
  }
];

// Prepare bar chart data
const chartData = productHierarchy.map(product => ({
  name: product.name,
  amount: product.amount,
  contribution: product.contribution,
  policies: product.policies,
  growth: product.growth
}));

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))', 
  'hsl(var(--accent))',
  'hsl(var(--teal))',
  'hsl(var(--muted-foreground))'
];

export function ProductPortfolioView() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleProductClick = (product: string) => {
    setSelectedProduct(selectedProduct === product ? null : product);
  };

  const selectedProductData = productHierarchy.find(p => p.name === selectedProduct);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Product Portfolio Analysis</h2>
        <p className="text-muted-foreground">
          Revenue contribution and performance metrics by product category
        </p>
      </div>

      {/* Product Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {productHierarchy.map((product, index) => (
          <Card
            key={product.name}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedProduct === product.name ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => handleProductClick(product.name)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="w-4 h-4" style={{ color: COLORS[index] }} />
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{product.contribution}%</div>
                <div className="text-xs text-muted-foreground">
                  ₹{(product.amount / 1000000).toFixed(1)}M
                </div>
                <div className="flex items-center gap-1">
                  {product.growth > 0 ? (
                    <TrendingUp className="w-3 h-3 text-teal" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  <span className={`text-xs ${product.growth > 0 ? 'text-teal' : 'text-destructive'}`}>
                    {product.growth > 0 ? '+' : ''}{product.growth}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Revenue Chart */}
      <ChartCard 
        title="Product Revenue Distribution" 
        description="Revenue contribution by product category - click on products above for detailed breakdown"
        variant="primary"
      >
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
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
                  if (name === 'amount') return [`₹${(Number(value) / 1000000).toFixed(1)}M`, 'Revenue'];
                  if (name === 'contribution') return [`${value}%`, 'Contribution'];
                  return [value, name];
                }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={selectedProduct === entry.name ? 'hsl(var(--primary))' : COLORS[index % COLORS.length]}
                    onClick={() => handleProductClick(entry.name)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Product Drill-down */}
      {selectedProductData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {selectedProduct} - Sub-Product Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {selectedProductData.policies.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Policies</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-teal">
                  ₹{(selectedProductData.amount / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-accent">
                  ₹{selectedProductData.avgPremium.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Avg Premium</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className={`text-2xl font-bold ${selectedProductData.growth > 0 ? 'text-teal' : 'text-destructive'}`}>
                  {selectedProductData.growth > 0 ? '+' : ''}{selectedProductData.growth}%
                </div>
                <div className="text-sm text-muted-foreground">Growth Rate</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Sub-Product Performance</h4>
              {selectedProductData.subProducts.map((subProduct, index) => (
                <div key={subProduct.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <div className="font-medium">{subProduct.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {subProduct.policies.toLocaleString()} policies
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{subProduct.contribution}%</div>
                    <div className="text-sm text-muted-foreground">
                      ₹{(subProduct.amount / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Analyze
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}