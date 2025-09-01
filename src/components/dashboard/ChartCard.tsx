import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary";
}

export function ChartCard({ 
  title, 
  description, 
  children, 
  className,
  variant = "default" 
}: ChartCardProps) {
  const variants = {
    default: "bg-card border-border",
    primary: "bg-gradient-to-br from-primary/5 to-transparent border-primary/20",
    secondary: "bg-gradient-to-br from-secondary/5 to-transparent border-secondary/20"
  };

  return (
    <Card className={cn(
      "shadow-lg hover:shadow-xl transition-all duration-300",
      variants[variant],
      className
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}