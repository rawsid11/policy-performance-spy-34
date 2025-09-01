import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "accent" | "teal";
  className?: string;
}

export function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = "default",
  className 
}: KPICardProps) {
  const variants = {
    default: "bg-gradient-to-br from-card to-muted/50 border-border",
    primary: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20",
    secondary: "bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20",
    accent: "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20",
    teal: "bg-gradient-to-br from-teal/10 to-teal/5 border-teal/20"
  };

  const iconColors = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    teal: "text-teal"
  };

  return (
    <Card className={cn(
      "relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300",
      variants[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", iconColors[variant])} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-teal" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}