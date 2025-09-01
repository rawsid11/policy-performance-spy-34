import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";

export interface DashboardFilters {
  region: string;
  branch: string;
  product: string;
  channel: string;
  paymentMechanism: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  searchTerm: string;
}

interface FilterPanelProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  regions: string[];
  branches: string[];
  products: string[];
  channels: string[];
  paymentMechanisms: string[];
}

export function FilterPanel({
  filters,
  onFiltersChange,
  regions,
  branches,
  products,
  channels,
  paymentMechanisms
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof DashboardFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      region: "all",
      branch: "all",
      product: "all",
      channel: "all",
      paymentMechanism: "all",
      dateRange: { from: undefined, to: undefined },
      searchTerm: ""
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => {
    if (typeof value === 'string') return value !== "" && value !== "all";
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== undefined);
    }
    return false;
  });

  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Hide" : "Show"} Filters
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Region Filter */}
          <div className="space-y-2">
            <Label>Region</Label>
            <Select value={filters.region} onValueChange={(value) => updateFilter('region', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Channel Filter */}
          <div className="space-y-2">
            <Label>Channel</Label>
            <Select value={filters.channel} onValueChange={(value) => updateFilter('channel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                {channels.map(channel => (
                  <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Filter */}
          <div className="space-y-2">
            <Label>Product</Label>
            <Select value={filters.product} onValueChange={(value) => updateFilter('product', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {products.map(product => (
                  <SelectItem key={product} value={product}>{product}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Policy, Branch..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}