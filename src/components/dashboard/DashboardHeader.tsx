import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Download, 
  Filter, 
  RefreshCw,
  TrendingUp
} from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Renewals Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Real-time insights and analytics for policy renewals performance
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}